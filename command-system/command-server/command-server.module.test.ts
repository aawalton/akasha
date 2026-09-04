import { afterEach, describe, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { dirname, join } from "node:path"
import {
  askServed,
  CommandServerRefusal,
  REFUSAL_GONE,
  REFUSAL_LEASE,
  REFUSAL_OVER_LEASE,
  type Serving,
  servingFrom,
} from "@akasha/editor-extension/command-server-client"
import { COMMANDS_SERVED, LEASE_ENV } from "../commands-served/commands-served.module.code.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { COMMANDS_LOADABLE, commandsAdrift } from "./command-server.module.code.ts"

const BUN = join(homedir(), ".bun", "bin", "bun")

const SERVER = join(import.meta.dir, "command-server.module.code.ts")

const WORKING_PAGE = "seat-system/seat-turn-states/pages/working.seat-turn-state.ts"

const ASK_MS = 20_000

const STARTED: Serving[] = []

const scratch = scratchWorld()

function rootWith(color: string): string {
  const at = scratch.rootFor("command-server-test-")
  mkdirSync(join(at, dirname(WORKING_PAGE)), { recursive: true })
  colorIn(at, color)
  return at
}

function colorIn(at: string, color: string): undefined {
  writeFileSync(
    join(at, WORKING_PAGE),
    `export const working = {\n  pageTypeSlug: "seat-turn-state",\n  slug: "working",\n` +
      `  definition: "an agent taking a turn",\n  colorSlug: "${color}",\n} as const\n`
  )
  return undefined
}

function clientAt(
  root: string,
  more: { readonly leaseBoundMs?: number; readonly serverLeaseMs?: number } = {}
): Serving {
  const client = servingFrom({
    bun: BUN,
    serverFile: SERVER,
    env: {
      ...process.env,
      PATH: `${dirname(BUN)}:${process.env["PATH"] ?? ""}`,
      AKASHA_ROOT: root,
      ...(more.serverLeaseMs === undefined ? {} : { [LEASE_ENV]: String(more.serverLeaseMs) }),
    },
    startTimeoutMs: 20_000,
    ...(more.leaseBoundMs === undefined ? {} : { leaseBoundMs: more.leaseBoundMs }),
  })
  STARTED.push(client)
  return client
}

async function colorSaid(
  client: Serving
): Promise<{ readonly color: string; readonly pid: number }> {
  const answer = await client.ask("agent-turn-colors", ["--state", "working"], ASK_MS)
  const said = JSON.parse(answer.stdout) as { colors: Record<string, string> }
  return { color: said.colors["working"] ?? "", pid: answer.pid }
}

async function rested(ms: number): Promise<void> {
  await new Promise((done) => setTimeout(done, ms))
}

afterEach(() => {
  while (STARTED.length > 0) STARTED.pop()?.dispose()
  scratch.sweep()
})

describe("what the server can load against what the caller is told it answers", () => {
  test("the two lists agree", () => {
    expect(commandsAdrift(COMMANDS_LOADABLE, COMMANDS_SERVED)).toEqual([])
  })

  test("a command named in COMMANDS_SERVED that this server cannot load is reported", () => {
    const said = commandsAdrift(["work-tree"], ["work-tree", "domain-tree"])
    expect(said).toHaveLength(1)
    expect(said[0]).toContain("domain-tree")
    expect(said[0]).toContain("refused as unserved")
  })

  test("a command this server can load that COMMANDS_SERVED does not name is reported", () => {
    const said = commandsAdrift(["work-tree", "domain-tree"], ["work-tree"])
    expect(said).toHaveLength(1)
    expect(said[0]).toContain("domain-tree")
    expect(said[0]).toContain("spawn a child for it and never ask")
  })
})

describe("the command server against a change made under it", () => {
  test("a color rewritten under a running server is the color it next answers", async () => {
    const root = rootWith("chartreuse")
    const client = clientAt(root)
    const first = await colorSaid(client)
    expect(first.color).toBe("chartreuse")

    colorIn(root, "vermilion")

    const second = await colorSaid(client)
    expect(second.pid).toBe(first.pid)
    expect(second.color).toBe("vermilion")
  }, 60_000)
})

describe("the command server where it cannot answer", () => {
  test("a server killed with an ask in flight refuses it rather than repeating its last answer", async () => {
    const root = rootWith("chartreuse")
    const client = clientAt(root)
    const first = await colorSaid(client)
    expect(first.color).toBe("chartreuse")

    process.kill(first.pid, "SIGKILL")
    const asking = client.ask("agent-turn-colors", ["--state", "working"], ASK_MS)

    const thrown = await asking.then(
      (answer) => ({ refused: false, saying: JSON.stringify(answer) as unknown }),
      (err: unknown) => ({ refused: true, saying: err })
    )
    expect(thrown.refused).toBe(true)
    expect(thrown.saying).toBeInstanceOf(CommandServerRefusal)
    expect((thrown.saying as CommandServerRefusal).refusal).toBe(REFUSAL_GONE)
  }, 60_000)

  test("a server past its lease refuses rather than answering from the runtime it has held", async () => {
    const root = rootWith("chartreuse")
    const client = clientAt(root, { serverLeaseMs: 1_500 })
    const first = await colorSaid(client)
    expect(first.color).toBe("chartreuse")

    await rested(1_800)

    const thrown = await client.ask("agent-turn-colors", ["--state", "working"], ASK_MS).then(
      (answer) => ({ refused: false, saying: JSON.stringify(answer) as unknown }),
      (err: unknown) => ({ refused: true, saying: err })
    )
    expect(thrown.refused).toBe(true)
    expect((thrown.saying as CommandServerRefusal).refusal).toBe(REFUSAL_LEASE)
  }, 60_000)

  test("an answer older than the caller's own bound is refused, not passed on", async () => {
    const root = rootWith("chartreuse")
    const client = clientAt(root, { serverLeaseMs: 30_000, leaseBoundMs: 1_000 })
    const first = await colorSaid(client)
    expect(first.color).toBe("chartreuse")

    await rested(1_400)

    const thrown = await client.ask("agent-turn-colors", ["--state", "working"], ASK_MS).then(
      (answer) => ({ refused: false, saying: JSON.stringify(answer) as unknown }),
      (err: unknown) => ({ refused: true, saying: err })
    )
    expect(thrown.refused).toBe(true)
    expect((thrown.saying as CommandServerRefusal).refusal).toBe(REFUSAL_OVER_LEASE)
  }, 60_000)
})

describe("the command server when its lease turns over under a caller", () => {
  test("askServed starts another server and answers, and the answer is the new color", async () => {
    const root = rootWith("chartreuse")
    const client = clientAt(root, { serverLeaseMs: 1_500 })
    const first = await colorSaid(client)
    expect(first.color).toBe("chartreuse")

    colorIn(root, "vermilion")
    await rested(1_800)

    const answer = await askServed(client, "agent-turn-colors", ["--state", "working"], ASK_MS)
    const said = JSON.parse(answer.stdout) as { colors: Record<string, string> }
    expect(said.colors["working"]).toBe("vermilion")
    expect(answer.pid).not.toBe(first.pid)
  }, 60_000)

  test("a disposed client starts nothing and refuses", async () => {
    const root = rootWith("chartreuse")
    const client = clientAt(root)
    await colorSaid(client)
    client.dispose()
    const thrown = await client.ask("agent-turn-colors", ["--state", "working"], ASK_MS).then(
      () => null,
      (err: unknown) => err
    )
    expect(thrown).toBeInstanceOf(CommandServerRefusal)
  }, 60_000)
})
