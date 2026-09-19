import {
  accessSync,
  constants,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmdirSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { pidAliveOrAssumeAlive } from "akasha/code/process/modules/pid-signal/pid-signal.module.code.ts"

export const NO_CODE = -1

const MICROS = 1_000_000

const MOUNT = "/sys/fs/cgroup"

const OWN = "/proc/self/cgroup"

const CONTROL = "cgroup.subtree_control"

const PROCS = "cgroup.procs"

const CPU = "cpu"

const MEMORY = "memory"

const STAT = "cpu.stat"

const PEAK = "memory.peak"

const HIGH = "memory.high"

const MAX = "cpu.max"

const UNBOUND = "max"

const PROCESSORS = "GOMAXPROCS"

const MEGA = 1_048_576

const USAGE = "usage_usec "

const POLL = 50

const MARGIN = 2

const SWEEPS = 20

const MADE = "akasha-"

const RUN = "run"

const TURN_ON = "+cpu +memory"

const APART = "-"

const DIGITS = /^\d+$/

const KILL = "cgroup.kill"

const ONE = "1"

const FOREIGN = "libpod-"

const LEFT = "running: a group was left at"

function holding(at: string): boolean {
  try {
    accessSync(at, constants.W_OK)
    const held = readFileSync(join(at, CONTROL), "utf8").split(/\s+/)
    return held.includes(CPU) && held.includes(MEMORY)
  } catch {
    return false
  }
}

export function delegatedAt(own: string): string | null {
  let at = dirname(join(MOUNT, own))
  while (at.startsWith(MOUNT) && at !== MOUNT) {
    if (holding(at)) return at
    at = dirname(at)
  }
  return null
}

function shareIn(at: string): number | null {
  let stated = ""
  try {
    stated = readFileSync(join(at, MAX), "utf8").trim()
  } catch {
    return null
  }
  const [held, over] = stated.split(/\s+/)
  if (held === undefined || held === UNBOUND) return null
  const share = Number(held) / Number(over)
  return Number.isFinite(share) && share > 0 ? share : null
}

function processorsOver(at: string): number | null {
  let tightest: number | null = null
  let here = at
  while (here.startsWith(MOUNT) && here !== MOUNT) {
    const share = shareIn(here)
    if (share !== null && (tightest === null || share < tightest)) tightest = share
    here = dirname(here)
  }
  return tightest === null ? null : Math.max(1, Math.round(tightest))
}

export function madePid(named: string): number | null {
  if (!named.startsWith(MADE)) return null
  const rest = named.slice(MADE.length)
  const apart = rest.indexOf(APART)
  const digits = apart < 0 ? "" : rest.slice(0, apart)
  return DIGITS.test(digits) ? Number(digits) : null
}

function groupIn(file: string): string | null {
  let text = ""
  try {
    text = readFileSync(file, "utf8")
  } catch {
    return null
  }
  return text.trim().split("\n")[0]?.split(":").at(-1) ?? null
}

export function ownAt(): string | null {
  return groupIn(OWN)
}

function under(own: string, at: string): boolean {
  const rel = at.slice(MOUNT.length)
  return own === rel || own.startsWith(`${rel}/`)
}

function groupsIn(at: string): readonly string[] {
  try {
    return readdirSync(at, { withFileTypes: true })
      .filter((one) => one.isDirectory())
      .map((one) => one.name)
  } catch {
    return []
  }
}

function leftIn(at: string): string {
  let procs = 0
  let groups = 0
  const counting = (here: string): undefined => {
    try {
      procs += readFileSync(join(here, PROCS), "utf8").split("\n").filter(Boolean).length
    } catch {}
    for (const one of groupsIn(here)) {
      groups += 1
      counting(join(here, one))
    }
  }
  counting(at)
  return `${String(procs)} processes and ${String(groups)} groups still in it`
}

function takenAway(at: string): boolean {
  for (const one of groupsIn(at)) takenAway(join(at, one))
  try {
    rmdirSync(at)
    return true
  } catch {
    return !existsSync(at)
  }
}

function stillMaking(pid: number, parent: string): boolean {
  if (!pidAliveOrAssumeAlive(pid)) return false
  const at = groupIn(`/proc/${String(pid)}/cgroup`)
  return at === null || under(at, parent)
}

function leftBy(named: string, parent: string, own: string): boolean {
  const pid = madePid(named)
  if (pid === null || under(own, join(parent, named))) return false
  return !stillMaking(pid, parent)
}

function leftUnder(at: string, own: string, left: string[]): undefined {
  for (const one of groupsIn(at)) {
    if (one.includes(FOREIGN)) continue
    if (leftBy(one, at, own)) left.push(join(at, one))
    else leftUnder(join(at, one), own, left)
  }
}

function leftSwept(root: string): undefined {
  const own = ownAt() ?? ""
  let left: string[] = []
  leftUnder(root, own, left)
  for (const at of left) {
    try {
      writeFileSync(join(at, KILL), ONE)
    } catch {}
  }
  for (let held = 0; held < SWEEPS && left.length > 0; held += 1) {
    left = left.filter((at) => !takenAway(at))
    if (left.length > 0) Bun.sleepSync(POLL)
  }
  for (const at of left) process.stderr.write(`${LEFT} ${at} — ${leftIn(at)}\n`)
}

export function leftSweptHere(): undefined {
  const own = ownAt()
  if (own === null) return
  const root = delegatedAt(own)
  if (root !== null) leftSwept(root)
}

function budgetAt(): string | null {
  const own = ownAt()
  if (own === null) return null
  const parent = delegatedAt(own)
  if (parent === null) return null
  leftSwept(parent)
  const at = join(parent, `${MADE}${String(process.pid)}${APART}${String(Bun.nanoseconds())}`)
  try {
    mkdirSync(at)
    writeFileSync(join(at, CONTROL), TURN_ON)
    mkdirSync(join(at, RUN))
    return at
  } catch {
    swept(at)
    return null
  }
}

function watching(at: string, ceiling: number): string {
  const cap = String(Math.round(ceiling * MARGIN * MICROS))
  return (
    `const fs = require("node:fs")\n` +
    `const at = ${JSON.stringify(at)}\n` +
    `for (;;) {\n` +
    `  let spent = 0\n` +
    `  try {\n` +
    `    for (const line of fs.readFileSync(at + "/${STAT}", "utf8").split("\\n"))\n` +
    `      if (line.startsWith(${JSON.stringify(USAGE)}))\n` +
    `        spent = Number(line.slice(${String(USAGE.length)}))\n` +
    `  } catch { break }\n` +
    `  if (spent > ${cap}) {\n` +
    `    try { fs.writeFileSync(at + "/cgroup.kill", "1") } catch {}\n` +
    `    break\n` +
    `  }\n` +
    `  Bun.sleepSync(${String(POLL)})\n` +
    `}\n`
  )
}

function joined(at: string, argv: readonly string[], found: string): readonly string[] {
  return ["sh", "-c", `echo $$ > ${join(at, RUN, PROCS)}; exec "$@"`, "sh", found, ...argv.slice(1)]
}

function foundFor(argv: readonly string[], asked: Asked): string | null {
  const first = argv[0]
  if (first === undefined) return null
  const path = asked.env === undefined ? undefined : asked.env.PATH
  return Bun.which(first, {
    ...(asked.cwd === undefined ? {} : { cwd: asked.cwd }),
    ...(path === undefined ? {} : { PATH: path }),
  })
}

function envUnder(asked: Asked, at: string | null): Asked["env"] {
  if (at === null) return asked.env
  const held = asked.env ?? process.env
  if (held[PROCESSORS] !== undefined) return asked.env
  const processors = processorsOver(at)
  return processors === null ? asked.env : { ...held, [PROCESSORS]: String(processors) }
}

function spentAt(at: string): number | null {
  let text = ""
  try {
    text = readFileSync(join(at, STAT), "utf8")
  } catch {
    return null
  }
  for (const line of text.split("\n"))
    if (line.startsWith(USAGE)) return Number(line.slice(USAGE.length)) / MICROS
  return null
}

function throttled(at: string, megabytes: number): undefined {
  try {
    writeFileSync(join(at, HIGH), String(Math.round(megabytes * MEGA)))
  } catch {}
}

function peakAt(at: string): number | null {
  let text = ""
  try {
    text = readFileSync(join(at, PEAK), "utf8")
  } catch {
    return null
  }
  const held = Number(text.trim())
  return Number.isFinite(held) ? held : null
}

function swept(at: string): undefined {
  for (let held = 0; held < SWEEPS; held += 1) {
    if (takenAway(at)) return
    Bun.sleepSync(POLL)
  }
  process.stderr.write(`${LEFT} ${at} — ${leftIn(at)}\n`)
}

function movedTo(at: string): boolean {
  try {
    writeFileSync(join(at, PROCS), String(process.pid))
    return true
  } catch {
    return false
  }
}

function takesBack(at: string): boolean {
  try {
    accessSync(join(at, PROCS), constants.W_OK)
    return true
  } catch {
    return false
  }
}

const freely = (): undefined => undefined

export function heldHere(megabytes: number): () => undefined {
  const own = ownAt()
  if (own === null) return freely
  const home = join(MOUNT, own)
  if (!takesBack(home)) return freely
  const at = budgetAt()
  if (at === null) return freely
  const leaf = join(at, RUN)
  throttled(leaf, megabytes)
  if (!movedTo(leaf)) {
    swept(at)
    return freely
  }
  return () => {
    movedTo(home)
    swept(at)
  }
}

export type Said = {
  readonly code: number
  readonly signal: string | null
  readonly out: string
  readonly err: string
  readonly cpuSeconds: number
  readonly peakBytes: number
  readonly peakMeasured: boolean
}

export type Held = {
  readonly code: number
  readonly signal: string | null
  readonly out: Uint8Array
  readonly err: string
  readonly cpuSeconds: number
  readonly peakBytes: number
  readonly peakMeasured: boolean
}

export type Asked = {
  readonly cwd?: string
  readonly env?: Record<string, string | undefined>
  readonly stdin?: Uint8Array
  readonly timeout?: number
  readonly cpuCeiling?: number
  readonly memoryCeiling?: number
  readonly metered?: boolean
}

export function grouped(asked: Asked): boolean {
  return (
    asked.metered === true || asked.cpuCeiling !== undefined || asked.memoryCeiling !== undefined
  )
}

export function bytes(argv: readonly string[], asked: Asked = {}): Held {
  const ceiling = asked.cpuCeiling
  const held = asked.memoryCeiling
  const found = foundFor(argv, asked)
  const at = found === null || !grouped(asked) ? null : budgetAt()
  if (at !== null && held !== undefined) throttled(at, held)
  const watch =
    at === null || ceiling === undefined
      ? null
      : Bun.spawn(["bun", "-e", watching(at, ceiling)], { stdout: "ignore", stderr: "ignore" })
  try {
    const named = at === null || found === null ? argv : joined(at, argv, found)
    const env = envUnder(asked, at)
    const done = Bun.spawnSync([...named], {
      stdout: "pipe",
      stderr: "pipe",
      ...(asked.cwd === undefined ? {} : { cwd: asked.cwd }),
      ...(env === undefined ? {} : { env }),
      ...(asked.stdin === undefined ? {} : { stdin: asked.stdin }),
      ...(asked.timeout === undefined ? {} : { timeout: asked.timeout }),
    })
    const group = at === null ? null : spentAt(at)
    const peak = at === null ? null : peakAt(at)
    return {
      code: done.exitCode ?? NO_CODE,
      signal: done.signalCode ?? null,
      out: new Uint8Array(done.stdout),
      err: done.stderr.toString(),
      cpuSeconds: group ?? Number(done.resourceUsage?.cpuTime.total ?? 0n) / MICROS,
      peakBytes: peak ?? 0,
      peakMeasured: peak !== null,
    }
  } finally {
    watch?.kill()
    if (at !== null) swept(at)
  }
}

export function endingOf(code: number, signal: string | null): string {
  return signal === null ? `exited ${String(code)}` : `died on ${signal}`
}

export function ran(argv: readonly string[], asked: Asked = {}): Said {
  const done = bytes(argv, asked)
  return {
    code: done.code,
    signal: done.signal,
    out: new TextDecoder().decode(done.out),
    err: done.err,
    cpuSeconds: done.cpuSeconds,
    peakBytes: done.peakBytes,
    peakMeasured: done.peakMeasured,
  }
}

export function said(argv: readonly string[], asked: Asked = {}): string {
  const done = ran(argv, asked)
  if (done.code === 0) return done.out
  throw new Error(`\`${argv[0] ?? ""}\` ${endingOf(done.code, done.signal)} — ${done.err.trim()}`)
}
