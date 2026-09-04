import { writeSync } from "node:fs"
import { join } from "node:path"
import { sayAnswer } from "../answer-bytes/answer-bytes.module.code.ts"
import {
  COMMANDS_SERVED,
  LEASE_ENV,
  LEASE_MS,
  leaseAsked,
  PROTOCOL,
} from "../commands-served/commands-served.module.code.ts"
import { duringOneCall } from "../during-call/during-call.module.code.ts"

const HERE = "command-system/command-server/command-server.module.code.ts"

const HELP = `bun ${HERE} — answer commands over a pipe, so a caller pays bun's startup once

Speaks newline-delimited JSON. Asks arrive on stdin and answers go out on **fd 3**, which the
caller opens as a fourth pipe. What this server is for, what it will not do, and why it refuses
to live are stated on the module page beside this file.

  ask     {"id":1,"verb":"agent-turn-colors","args":["01a0…"]}
  answer  {"id":1,"ok":true,"code":0,"stdout":"…","stderr":"…","ageMs":12,"pid":9}
  refusal {"id":1,"ok":false,"refusal":"lease","saying":"…","ageMs":30001}

The wire key is \`verb\`, which the client declares and this end reads, and it is the one word
of the older protocol kept. The first line on fd 3 is {"hello":${PROTOCOL},"pid":…,"leaseMs":…}
and nothing is asked before it. The lease is ${LEASE_MS}ms and \`${LEASE_ENV}\` names another.

Commands: ${COMMANDS_SERVED.join(", ")}

  --help  This.
`

const COMMANDS_AT = "command-system/commands"

async function commandFile(command: string): Promise<string> {
  const at = join(COMMANDS_AT, command, `${command}.command.code.ts`)
  try {
    const { akashaRoot } = await import("@akasha/pages-system/checkout-roots")
    return join(akashaRoot(), at)
  } catch {
    return at
  }
}

function answerSaid(answer: {
  readonly report: readonly string[]
  readonly refusals: readonly string[]
  readonly code: number
}): number {
  for (const one of answer.refusals) process.stderr.write(`${one}\n`)
  if (answer.report.length > 0) sayAnswer(answer.report.map((one) => `${one}\n`).join(""))
  return answer.code
}

type Ran = (argv: readonly string[]) => number | Promise<number>

const LOAD: Readonly<Record<string, () => Promise<{ readonly main: Ran }>>> = {
  "agent-turn-colors": async () => {
    const { agentTurnColors } = await import(
      "../../commands/agent-turn-colors/agent-turn-colors.command.code.ts"
    )
    const { akashaRoot } = await import("@akasha/pages-system/checkout-roots")
    return {
      main: (argv) => {
        const at = akashaRoot()
        return answerSaid(
          agentTurnColors(argv, {
            root: at,
            calledAs: "akasha",
            from: at,
            writer: null,
            agentId: null,
          })
        )
      },
    }
  },
}

const CALLED: ReadonlySet<string> = new Set([
  "agent-forest",
  "claude-usage",
  "seat-transcripts",
  "work-tree",
])

async function called(command: string, argv: readonly string[]): Promise<number> {
  const { calling } = await import("../calling/calling.module.code.ts")
  const { akashaRoot } = await import("@akasha/pages-system/checkout-roots")
  const root = akashaRoot()
  const answer = await calling([command, ...argv], {
    root,
    calledAs: "akasha",
    from: root,
    writer: null,
    agentId: null,
  })
  return answerSaid(answer)
}

export function commandsAdrift(
  loadable: readonly string[],
  served: readonly string[]
): readonly string[] {
  const canLoad = new Set(loadable)
  const isNamed = new Set(served)
  return [
    ...served
      .filter((command) => !canLoad.has(command))
      .map(
        (command) =>
          `${command} is named in COMMANDS_SERVED and is not in this server's LOAD table, so every ask for it would be refused as unserved`
      ),
    ...loadable
      .filter((command) => !isNamed.has(command))
      .map(
        (command) =>
          `${command} is in this server's LOAD table and is not named in COMMANDS_SERVED, so the caller would spawn a child for it and never ask`
      ),
  ]
}

export const COMMANDS_LOADABLE: readonly string[] = [...Object.keys(LOAD), ...CALLED].sort()

const loaded = new Map<string, Ran>()

async function ranFor(named: string): Promise<Ran | null> {
  const held = loaded.get(named)
  if (held !== undefined) return held
  if (CALLED.has(named)) {
    const one: Ran = (argv) => called(named, argv)
    loaded.set(named, one)
    return one
  }
  const load = LOAD[named]
  if (load === undefined) return null
  const one = (await load()).main
  loaded.set(named, one)
  return one
}

const PROTOCOL_FD = 3

const LEASE = leaseAsked()

const STARTED_AT = Date.now()

const GOODBYE_MS = 500

const IDLE_OVER_LEASE = 2

interface Ask {
  readonly id: number
  readonly command: string
  readonly args: readonly string[]
}

function ageMs(): number {
  return Date.now() - STARTED_AT
}

function writeAll(fd: number, text: string): undefined {
  let buffer = Buffer.from(text, "utf8")
  while (buffer.length > 0) {
    const written = writeSync(fd, buffer)
    buffer = buffer.subarray(written)
  }
  return undefined
}

function say(said: unknown): undefined {
  return writeAll(PROTOCOL_FD, `${JSON.stringify(said)}\n`)
}

function note(text: string): undefined {
  try {
    writeAll(2, `command-server: ${text}\n`)
  } catch {}
  return undefined
}

let leaseOver = false
let running = false
const WAITING: Ask[] = []

function refuse(ask: Ask, refusal: string, saying: string): undefined {
  return say({ id: ask.id, ok: false, refusal, saying, ageMs: ageMs() })
}

interface Caught {
  readonly stdout: string
  readonly stderr: string
}

async function ran(
  one: Ran,
  ask: Ask
): Promise<{ readonly code: number; readonly failure: string | null } & Caught> {
  const out: string[] = []
  const err: string[] = []
  const stdoutWas = process.stdout.write
  const stderrWas = process.stderr.write
  const argvWas = process.argv
  const caught = (into: string[]) =>
    ((chunk: unknown, ...rest: readonly unknown[]): boolean => {
      into.push(
        typeof chunk === "string" ? chunk : Buffer.from(chunk as Uint8Array).toString("utf8")
      )
      const then = rest.find((each) => typeof each === "function")
      if (typeof then === "function") (then as () => void)()
      return true
    }) as typeof process.stdout.write
  const at = await commandFile(ask.command)
  process.stdout.write = caught(out)
  process.stderr.write = caught(err)
  process.argv = [argvWas[0] ?? "bun", at, ...ask.args]
  let code = 1
  let failure: string | null = null
  try {
    code = await duringOneCall(async () => one(ask.args))
  } catch (thrown) {
    failure = thrown instanceof Error ? `${thrown.message}\n${thrown.stack ?? ""}` : String(thrown)
  } finally {
    process.stdout.write = stdoutWas
    process.stderr.write = stderrWas
    process.argv = argvWas
  }
  return { code, failure, stdout: out.join(""), stderr: err.join("") }
}

async function serve(ask: Ask): Promise<undefined> {
  if (leaseOver || ageMs() >= LEASE) {
    leaseOver = true
    return refuse(
      ask,
      "lease",
      `this server's lease of ${LEASE}ms is up, so it answers nothing more`
    )
  }
  let one: Ran | null
  try {
    one = await ranFor(ask.command)
  } catch (thrown) {
    return refuse(ask, "unloadable", `${ask.command} could not be loaded: ${String(thrown)}`)
  }
  if (one === null) {
    return refuse(ask, "unserved", `${ask.command} is not a command this server answers`)
  }
  const askedAt = ageMs()
  const answer = await ran(one, ask)
  if (answer.failure !== null) {
    return refuse(ask, "threw", `${ask.command} threw: ${answer.failure}`)
  }
  return say({
    id: ask.id,
    ok: answer.code === 0,
    code: answer.code,
    stdout: answer.stdout,
    stderr: answer.stderr,
    ageMs: askedAt,
    tookMs: ageMs() - askedAt,
    pid: process.pid,
  })
}

let idleTimer: ReturnType<typeof setTimeout> | undefined

function idling(): undefined {
  if (idleTimer !== undefined) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    note(`nothing has been asked for ${LEASE * IDLE_OVER_LEASE}ms, so this server is finished`)
    finish()
  }, LEASE * IDLE_OVER_LEASE)
  return undefined
}

function finish(): undefined {
  if (idleTimer !== undefined) clearTimeout(idleTimer)
  idleTimer = undefined
  process.exitCode = 0
  try {
    process.stdin.destroy()
  } catch {}
  setTimeout(() => {
    process.exit(0)
  }, GOODBYE_MS).unref()
  return undefined
}

async function pump(): Promise<undefined> {
  if (running) return undefined
  running = true
  try {
    for (;;) {
      const ask = WAITING.shift()
      if (ask === undefined) break
      await serve(ask)
    }
  } finally {
    running = false
  }
  if (leaseOver) finish()
  return undefined
}

export const WIRE_COMMAND_KEY = "verb"

export function askIn(line: string): Ask | null {
  let said: unknown
  try {
    said = JSON.parse(line)
  } catch {
    return null
  }
  if (said === null || typeof said !== "object") return null
  const held = said as Record<string, unknown>
  const named = held[WIRE_COMMAND_KEY]
  if (typeof held["id"] !== "number" || typeof named !== "string") return null
  const args = held["args"]
  return {
    id: held["id"],
    command: named,
    args: Array.isArray(args) ? args.filter((one): one is string => typeof one === "string") : [],
  }
}

function listen(): undefined {
  let held = ""
  process.stdin.setEncoding("utf8")
  process.stdin.on("data", (chunk: string) => {
    held += chunk
    for (;;) {
      const cut = held.indexOf("\n")
      if (cut < 0) break
      const line = held.slice(0, cut)
      held = held.slice(cut + 1)
      if (line.trim() === "") continue
      const ask = askIn(line)
      if (ask === null) {
        note(`an ask that is not a JSON object carrying an id and a name was thrown away`)
        continue
      }
      WAITING.push(ask)
      idling()
      void pump()
    }
  })
  process.stdin.on("end", () => finish())
  process.stdin.on("close", () => finish())
  process.stdin.on("error", () => finish())
  return undefined
}

export function main(argv: readonly string[]): number {
  const adrift = commandsAdrift(COMMANDS_LOADABLE, COMMANDS_SERVED)
  if (adrift.length > 0) {
    process.stderr.write(
      `error: what this server can load and what COMMANDS_SERVED names have drifted apart, so it answers nothing:\n${adrift
        .map((one) => `  ${one}\n`)
        .join("")}`
    )
    return 1
  }
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return 0
  }
  try {
    say({ hello: PROTOCOL, pid: process.pid, leaseMs: LEASE, commands: COMMANDS_SERVED })
  } catch (thrown) {
    process.stderr.write(
      `error: nothing is listening on fd ${PROTOCOL_FD}, and that is where every answer goes — spawn this with a fourth pipe (${String(thrown)})\n`
    )
    return 1
  }
  idling()
  listen()
  return 0
}

if (import.meta.main) process.exitCode = main(process.argv.slice(2))
