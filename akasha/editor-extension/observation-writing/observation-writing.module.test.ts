import { afterEach, describe, expect, test } from "bun:test"
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import {
  bunIn,
  type WriterAnswer,
  type WriterAsk,
  type Writing,
  writerMainIn,
  writingTo,
} from "./observation-writing.module.code.ts"

const REPO = join(import.meta.dir, "..", "..", "..")

const WRITER_MAIN = writerMainIn(REPO)

const PAGE_TYPE = "code-editor-window"

const STATES = join("pages", PAGE_TYPE)

const BUN_LOST_THE_PIPE = "nothing is listening on fd 3"

const GOES = 3

interface Writer {
  readonly client: Writing
  readonly noise: string[]
}

const started: Writer[] = []

const roots: string[] = []

function rootHere(): string {
  const at = mkdtempSync(join(tmpdir(), "observation-writer-test-"))
  roots.push(at)
  mkdirSync(join(at, ".git"), { recursive: true })
  const repoPages = join(at, "akasha", "infrastructure", "repos", "pages")
  mkdirSync(repoPages, { recursive: true })
  mkdirSync(join(at, "pages", "page-type"), { recursive: true })
  writeFileSync(
    join(repoPages, "akasha-repo.repo.ts"),
    `export const akashaRepo = {\n  pageTypeSlug: "repo",\n  slug: "akasha-repo",\n` +
      `  definition: "the fixture checkout these tests write in",\n} as const\n`
  )
  writeFileSync(
    join(at, "pages", "page-type", `${PAGE_TYPE}.page-type.md`),
    `---\nid: a97ae8c4-f0b7-57e3-8e46-7f6fcfdc1e1e\npage-type-slug: page-type\n` +
      `title: "Code editor window"\nfiles: akasha:${STATES}/**/*.${PAGE_TYPE}.md\n` +
      `slug: ${PAGE_TYPE}\n---\n\n# Definition\n\n` +
      `- **Code editor window** — one open window of the editor.\n`
  )
  return at
}

function pidFile(root: string): string {
  return join(root, "child.pid")
}

function bunSayingItsPid(root: string): string {
  const bun = bunIn()
  const at = join(root, "bun-saying-its-pid")
  writeFileSync(
    at,
    `#!/bin/sh\nprintf '%s' "$$" > ${JSON.stringify(pidFile(root))}\nexec ${JSON.stringify(bun)} "$@"\n`
  )
  chmodSync(at, 0o755)
  return at
}

function pidHere(root: string): number {
  return Number(readFileSync(pidFile(root), "utf8"))
}

function writerAt(root: string): Writer {
  const bun = bunIn()
  const noise: string[] = []
  const client = writingTo({
    bun: bunSayingItsPid(root),
    mainFile: WRITER_MAIN,
    env: {
      ...process.env,
      PATH: `${dirname(bun)}:${process.env["PATH"] ?? ""}`,
      AKASHA_ROOT: root,
      AKASHA_TEST_RUN: "1",
    },
    onNoise: (text) => void noise.push(text),
  })
  const writer = { client, noise }
  started.push(writer)
  return writer
}

function askFor(window: string, feature: string): WriterAsk {
  return {
    act: "patch-state",
    pageType: PAGE_TYPE,
    name: window,
    url: `http://127.0.0.1:8787/patch-state/${PAGE_TYPE}/${window}`,
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      writer: "editor-observations",
      values: {
        features: { [feature]: { at: "2026-01-01T00:00:00.000Z" } },
        "observed-at": "2026-01-01T00:00:00.000Z",
      },
    }),
  }
}

interface Told {
  readonly answer: WriterAnswer | null
  readonly saying: string
}

function told(asking: Promise<WriterAnswer>): Promise<Told> {
  return asking.then(
    (answer) => ({ answer, saying: "" }),
    (err: unknown) => ({ answer: null, saying: String(err) })
  )
}

async function asked(writer: Writer, ask: WriterAsk): Promise<WriterAnswer> {
  for (let go = 1; ; go++) {
    const said = await told(writer.client.ask(ask))
    if (said.answer !== null) return said.answer
    const bunsFault = writer.noise.some((one) => one.includes(BUN_LOST_THE_PIPE))
    if (go >= GOES || !bunsFault) throw new Error(said.saying)
    writer.noise.length = 0
  }
}

async function handedOver(): Promise<void> {
  await new Promise<void>((done) => setImmediate(done))
}

const PROMPTLY_MS = 10_000

async function promptly<T>(what: Promise<T>, saying: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const late = new Promise<never>((_, refuse) => {
    timer = setTimeout(
      () => refuse(new Error(`${saying} had not settled ${PROMPTLY_MS}ms later`)),
      PROMPTLY_MS
    )
  })
  try {
    return await Promise.race([what, late])
  } finally {
    clearTimeout(timer)
  }
}

async function afterAMoment(): Promise<void> {
  await new Promise<void>((done) => setTimeout(done, 25))
}

async function pidAppeared(root: string, within: number): Promise<number> {
  const until = Date.now() + within
  for (;;) {
    if (existsSync(pidFile(root))) {
      const pid = pidHere(root)
      if (Number.isFinite(pid) && pid > 0) return pid
    }
    if (Date.now() >= until) throw new Error("no child ever wrote its pid down")
    await afterAMoment()
  }
}

function alive(pid: number): boolean {
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

async function goneWithin(pid: number, within: number): Promise<boolean> {
  const until = Date.now() + within
  for (;;) {
    if (!alive(pid)) return true
    if (Date.now() >= until) return false
    await afterAMoment()
  }
}

const CLIENT = join(
  REPO,
  "akasha",
  "editor-extension",
  "observation-writing",
  "observation-writing.module.code.ts"
)

const DRIVER = `
import { pathToFileURL } from "node:url"

const [, , clientAt, mainFile, bun, root, first, sameTick] = process.argv
const { writingTo } = await import(pathToFileURL(clientAt).href)

const noise = []
const client = writingTo({
  bun,
  mainFile,
  env: { ...process.env, AKASHA_ROOT: root, AKASHA_TEST_RUN: "1" },
  onNoise: (text) => void noise.push(text),
})

const told = (asking) =>
  asking.then(
    (answer) => ({ answer, saying: "" }),
    (err) => ({ answer: null, saying: String(err) })
  )

const say = (what) => console.log("VERDICT " + JSON.stringify({ ...what, noise }))

const before = await told(client.ask(JSON.parse(first)))
if (before.answer === null) {
  say(before)
  process.exit(0)
}

const asking = told(client.ask(JSON.parse(sameTick)))
const disposing = client.dispose()

const late = new Promise((_, refuse) => {
  const timer = setTimeout(() => refuse(new Error("it had still not settled 20000ms later")), 20000)
  timer.unref()
})
try {
  await Promise.race([disposing, late])
  say(await Promise.race([asking, late]))
} catch (thrown) {
  say({ answer: null, saying: String(thrown) })
}
process.exit(0)
`

interface Drove extends Told {
  readonly noise: readonly string[]
}

function droveUnderNode(root: string): Drove {
  const bun = bunIn()
  const at = join(root, "same-tick-under-node.mjs")
  writeFileSync(at, DRIVER)
  const ran = Bun.spawnSync({
    cmd: [
      "node",
      at,
      CLIENT,
      WRITER_MAIN,
      bun,
      root,
      JSON.stringify(askFor("before-dispose", "activation")),
      JSON.stringify(askFor("same-tick", "shutdown")),
    ],
    env: {
      ...process.env,
      PATH: `${dirname(bun)}:${process.env["PATH"] ?? ""}`,
      AKASHA_ROOT: root,
      AKASHA_TEST_RUN: "1",
    },
    stdout: "pipe",
    stderr: "pipe",
  })
  const out = ran.stdout.toString()
  const said = out.split("\n").find((one) => one.startsWith("VERDICT "))
  if (said === undefined) {
    throw new Error(
      `the node driver reached no verdict (exit ${String(ran.exitCode)})\n` +
        `--- stdout ---\n${out}\n--- stderr ---\n${ran.stderr.toString()}`
    )
  }
  return JSON.parse(said.slice("VERDICT ".length)) as Drove
}

function landedIn(root: string): readonly string[] {
  const at = join(root, STATES)
  if (!existsSync(at)) return []
  return readdirSync(at).sort()
}

function stateFile(window: string): string {
  return `${window}.${PAGE_TYPE}.uncommitted.yaml`
}

function stateOf(root: string, window: string): string {
  return readFileSync(join(root, STATES, stateFile(window)), "utf8")
}

afterEach(async () => {
  while (started.length > 0)
    await started
      .pop()
      ?.client.dispose()
      .catch(() => undefined)
  while (roots.length > 0) rmSync(roots.pop() ?? "", { recursive: true, force: true })
})

describe("the observation writer against a real child", () => {
  test("an ask is answered, and the state it names lands in the checkout", async () => {
    const root = rootHere()
    const writer = writerAt(root)

    const answer = await asked(writer, askFor("one-window", "activation"))

    expect(answer.ok).toBe(true)
    expect(answer.status).toBe(200)
    expect(landedIn(root)).toEqual([stateFile("one-window")])
    expect(stateOf(root, "one-window")).toContain("activation")
  }, 60_000)

  test("a disposed writer starts no child and refuses", async () => {
    const root = rootHere()
    const writer = writerAt(root)

    await writer.client.dispose()
    const said = await told(writer.client.ask(askFor("after-dispose", "activation")))

    expect(said.answer).toBe(null)
    expect(said.saying).toContain("disposed")
    expect(landedIn(root)).toEqual([])
  }, 60_000)
})

describe("the observation writer when the host is disposed", () => {
  test("everything handed over before dispose has landed by the time dispose returns", async () => {
    const root = rootHere()
    const writer = writerAt(root)

    await asked(writer, askFor("first-window", "activation"))
    const pid = pidHere(root)

    process.kill(pid, "SIGSTOP")
    const windows = ["late-1", "late-2", "late-3", "late-4", "late-5", "late-6", "late-7", "late-8"]
    const asking = windows.map((window) => told(writer.client.ask(askFor(window, "shutdown"))))
    await handedOver()

    expect(landedIn(root)).toEqual([stateFile("first-window")])

    const disposing = writer.client.dispose()
    process.kill(pid, "SIGCONT")
    await disposing

    expect(landedIn(root)).toEqual([stateFile("first-window"), ...windows.map(stateFile)].sort())
    for (const window of windows) expect(stateOf(root, window)).toContain("shutdown")

    const said = await Promise.all(asking)
    expect(said.map((one) => one.answer?.ok)).toEqual(windows.map(() => true))
  }, 60_000)
})

describe("the observation writer disposed in the same tick as a write", () => {
  test("a dispose landing on a start still in flight leaves no child behind", async () => {
    for (let go = 1; ; go++) {
      const root = rootHere()
      const writer = writerAt(root)

      const asking = told(writer.client.ask(askFor("mid-start", "activation")))
      const disposing = writer.client.dispose()

      const pid = await pidAppeared(root, PROMPTLY_MS)
      await promptly(disposing, "dispose")
      const said = await promptly(asking, "the ask")

      const bunsFault = writer.noise.some((one) => one.includes(BUN_LOST_THE_PIPE))
      if (said.answer === null && bunsFault && go < GOES) continue

      expect(await goneWithin(pid, PROMPTLY_MS)).toBe(true)

      expect(said.answer).toBe(null)
      expect(said.saying).toContain("disposed")
      expect(landedIn(root)).toEqual([])
      return
    }
  }, 60_000)

  test("an ask fired in the same tick as a dispose is handed over before stdin closes", async () => {
    for (let go = 1; ; go++) {
      const root = rootHere()
      const said = droveUnderNode(root)
      if (said.saying !== "" && said.noise.some((one) => one.includes(BUN_LOST_THE_PIPE))) {
        if (go < GOES) continue
      }

      expect(said.saying).toBe("")
      expect(said.answer?.ok).toBe(true)

      expect(landedIn(root)).toEqual([stateFile("before-dispose"), stateFile("same-tick")].sort())
      expect(stateOf(root, "same-tick")).toContain("shutdown")
      return
    }
  }, 120_000)
})

describe("the observation writer where the child is gone", () => {
  test("an ask outstanding when the child is killed is refused by name, and the next ask starts another", async () => {
    const root = rootHere()
    const writer = writerAt(root)

    await asked(writer, askFor("before-kill", "activation"))
    const first = pidHere(root)

    process.kill(first, "SIGSTOP")
    const asking = told(writer.client.ask(askFor("during-kill", "shutdown")))
    await handedOver()
    process.kill(first, "SIGKILL")

    const said = await asking
    expect(said.answer).toBe(null)
    expect(said.saying).toContain("the observation writer exited")
    expect(landedIn(root)).toEqual([stateFile("before-kill")])

    const after = await asked(writer, askFor("after-kill", "activation"))
    expect(after.ok).toBe(true)
    expect(pidHere(root)).not.toBe(first)
    expect(landedIn(root)).toContain(stateFile("after-kill"))
  }, 60_000)
})

describe("two observation writers", () => {
  test("two writers built independently keep their own child, and disposing one leaves the other answering", async () => {
    const here = rootHere()
    const there = rootHere()
    const one = writerAt(here)
    const other = writerAt(there)

    await asked(one, askFor("here-window", "activation"))
    await asked(other, askFor("there-window", "activation"))

    expect(landedIn(here)).toEqual([stateFile("here-window")])
    expect(landedIn(there)).toEqual([stateFile("there-window")])
    expect(pidHere(here)).not.toBe(pidHere(there))

    await one.client.dispose()

    const after = await asked(other, askFor("there-again", "shutdown"))
    expect(after.ok).toBe(true)
    expect(landedIn(there)).toContain(stateFile("there-again"))
  }, 60_000)
})
