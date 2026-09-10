import { writeSync } from "node:fs"
import { join } from "node:path"
import {
  LEASE_ENV,
  LEASE_MS,
  leaseAsked,
  PROTOCOL,
} from "akasha/editor-extension/harness-wire/harness-wire.module.code.ts"
import { sayAnswer } from "../../commands/modules/answer-bytes/answer-bytes.module.code.ts"
import type { Answer, Given } from "../../commands/modules/calling/calling.module.code.ts"
import { duringOneCall } from "../../commands/modules/during-call/during-call.module.code.ts"

const HERE = "editor-extension/command-server/command-server.module.code.ts"

const CHECKOUT = join(import.meta.dir, "..", "..")

const HELP = `bun ${HERE} — answer calls over a pipe, so a caller pays bun's startup once

Speaks newline-delimited JSON. Asks arrive on stdin and answers go out on **fd 3**, which the
caller opens as a fourth pipe. What this server is for, what it will not do, and why it refuses
to live are stated on the module page beside this file.

  ask     {"id":1,"module":"agent-turn-colors","export":"agentTurnColors","args":["01a0…"]}
  answer  {"id":1,"ok":true,"code":0,"stdout":"…","stderr":"…","ageMs":12,"pid":9}
  refusal {"id":1,"ok":false,"refusal":"lease","saying":"…","ageMs":30001}

An ask names the page whose code holds the export, by that page's slug, and names the export
beside it. The first line on fd 3 is {"hello":${PROTOCOL},"pid":…,"leaseMs":…} and nothing is
asked before it. The lease is ${LEASE_MS}ms and \`${LEASE_ENV}\` names another.

  --help  This.
`

const MODULE_TYPE = "module"

const COMMAND_TYPE = "command"

const CODE = "code"

const TS = "ts"

async function codeFileIn(root: string, slug: string): Promise<string | null> {
  const { listedAt } = await import("@akasha/pages/index-reading")
  const { besideAt } = await import("@akasha/pages/page-file-name")
  for (const pageTypeSlug of [MODULE_TYPE, COMMAND_TYPE]) {
    const found = listedAt(root, pageTypeSlug, slug)
    const one = found.length === 1 ? found[0] : undefined
    if (one === undefined) continue
    const beside = besideAt(one.path, CODE, TS)
    if (beside !== null) return beside
  }
  return null
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

type Ran = (argv: readonly string[], given: Given) => Answer | Promise<Answer>

interface Loaded {
  readonly one: Ran
  readonly at: string
}

const loaded = new Map<string, Loaded>()

function asked(ask: Ask): string {
  return `${ask.module}#${ask.exported}`
}

async function ranFor(root: string, ask: Ask): Promise<Loaded | string> {
  const key = asked(ask)
  const held = loaded.get(key)
  if (held !== undefined) return held
  const at = await codeFileIn(root, ask.module)
  if (at === null) {
    return `no module and no command carries the slug \`${ask.module}\`, so ${key} is answered by nothing`
  }
  const mod = (await import(join(root, at))) as Record<string, unknown>
  const one = mod[ask.exported]
  if (typeof one !== "function") {
    return `\`${at}\` exports no function named \`${ask.exported}\``
  }
  const made: Loaded = { one: one as Ran, at }
  loaded.set(key, made)
  return made
}

const PROTOCOL_FD = 3

const LEASE = leaseAsked()

const STARTED_AT = Date.now()

const GOODBYE_MS = 500

const IDLE_OVER_LEASE = 2

interface Ask {
  readonly id: number
  readonly module: string
  readonly exported: string
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
  found: Loaded,
  ask: Ask,
  root: string
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
  const given: Given = { root, calledAs: "akasha", from: root, writer: null, agentId: null }
  process.stdout.write = caught(out)
  process.stderr.write = caught(err)
  process.argv = [argvWas[0] ?? "bun", join(CHECKOUT, found.at), ...ask.args]
  let code = 1
  let failure: string | null = null
  try {
    code = await duringOneCall(async () => answerSaid(await found.one(ask.args, given)))
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
  const { akashaRoot } = await import("@akasha/pages/checkout-roots")
  const root = akashaRoot()
  let found: Loaded | string
  try {
    found = await ranFor(CHECKOUT, ask)
  } catch (thrown) {
    return refuse(ask, "unloadable", `${asked(ask)} could not be loaded: ${String(thrown)}`)
  }
  if (typeof found === "string") {
    return refuse(ask, "unserved", found)
  }
  const askedAt = ageMs()
  const answer = await ran(found, ask, root)
  if (answer.failure !== null) {
    return refuse(ask, "threw", `${asked(ask)} threw: ${answer.failure}`)
  }
  return say({
    id: ask.id,
    ok: true,
    code: answer.code,
    stdout: answer.stdout,
    stderr: answer.stderr,
    ageMs: askedAt,
    tookMs: ageMs() - askedAt,
    pid: process.pid,
  })
}

let idleTimer: ReturnType<typeof setTimeout> | undefined

function working(): undefined {
  if (idleTimer !== undefined) clearTimeout(idleTimer)
  idleTimer = undefined
  return undefined
}

function idling(): undefined {
  working()
  idleTimer = setTimeout(() => {
    note(`nothing has been asked for ${LEASE * IDLE_OVER_LEASE}ms, so this server is finished`)
    finish()
  }, LEASE * IDLE_OVER_LEASE)
  return undefined
}

function finish(): undefined {
  working()
  process.exitCode = 0
  try {
    process.stdin.destroy()
  } catch {}
  setTimeout(() => {
    process.exit(0)
  }, GOODBYE_MS)
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
    if (leaseOver) {
      finish()
    } else {
      idling()
    }
  }
  return undefined
}

export const WIRE_MODULE_KEY = "module"

export const WIRE_EXPORT_KEY = "export"

export function askIn(line: string): Ask | null {
  let said: unknown
  try {
    said = JSON.parse(line)
  } catch {
    return null
  }
  if (said === null || typeof said !== "object") return null
  const held = said as Record<string, unknown>
  const slug = held[WIRE_MODULE_KEY]
  const exported = held[WIRE_EXPORT_KEY]
  if (typeof held["id"] !== "number") return null
  if (typeof slug !== "string" || typeof exported !== "string") return null
  const args = held["args"]
  return {
    id: held["id"],
    module: slug,
    exported,
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
        note(
          `an ask that is not a JSON object carrying an id, a module and an export was thrown away`
        )
        continue
      }
      WAITING.push(ask)
      working()
      void pump()
    }
  })
  process.stdin.on("end", () => finish())
  process.stdin.on("close", () => finish())
  process.stdin.on("error", () => finish())
  return undefined
}

export function main(argv: readonly string[]): number {
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return 0
  }
  try {
    say({ hello: PROTOCOL, pid: process.pid, leaseMs: LEASE })
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
