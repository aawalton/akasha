import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import {
  answeredWith,
  OK,
  OPERATIONAL,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { allowedThrough } from "akasha/command/modules/stopping/command-stopping.module.code.ts"
import { inCluster } from "akasha/infrastructure/job/modules/run-in-cluster/run-in-cluster.module.code.ts"

export const DETACHED = "AKASHA_DEPLOY_DETACHED"

const ROOT_NAME = "AKASHA_ROOT"

const UNIT_LEAD = "akasha-deploying-"

const UNIT_END = ".service"

export const RUNTIME_MAX_SECONDS = 3600

const LAUNCHER =
  "infrastructure/machine/provisioning/scripts/akasha-launcher/akasha-launcher.shell-script.shell.sh"

const DEPLOY = "deploy"

const POLL_MS = 1000

const ALIVE_EVERY = 5

const NAME = /^[A-Za-z_][A-Za-z0-9_]*$/

const WAITING = "waiting"

const WAITING_LINE = new RegExp(`^${WAITING}\\t`, "m")

const UNCARRIED: ReadonlySet<string> = new Set([
  "AGENT_ID",
  "ACTING_AGENT_ID",
  "INVOCATION_ID",
  "JOURNAL_STREAM",
  "NOTIFY_SOCKET",
  "LISTEN_PID",
  "LISTEN_FDS",
  "LISTEN_FDNAMES",
  "MANAGERPID",
  "SYSTEMD_EXEC_PID",
  DETACHED,
  ROOT_NAME,
])

const GONE: ReadonlySet<string> = new Set(["inactive", "failed", ""])

const ENDING_SIGNALS: readonly NodeJS.Signals[] = [
  "SIGHUP",
  "SIGINT",
  "SIGTERM",
  "SIGPIPE",
  "SIGUSR1",
  "SIGUSR2",
  "SIGSTKFLT",
]

type Place = {
  readonly unit: string
  readonly log: string
  readonly ended: string
  readonly writer: string
}

type Env = Readonly<Record<string, string | undefined>>

type Started = { readonly code: number; readonly out: string }

type Starting = (words: readonly string[]) => Started

export type Following = {
  readonly write: (bytes: Uint8Array) => void
  readonly alive: (unit: string) => boolean
  readonly sleep: (ms: number) => Promise<void>
}

export function apartFrom(given: Given, env: Env = process.env, cluster = inCluster()): boolean {
  return given.calledWhole !== undefined && env[DETACHED] === undefined && !cluster
}

export function unitFor(slug: string, now: number): string {
  return `${UNIT_LEAD}${slug}-${String(now)}${UNIT_END}`
}

function stateHome(env: Env = process.env): string {
  return env.XDG_STATE_HOME ?? join(homedir(), ".local", "state")
}

export function placeFor(state: string, unit: string): Place & { readonly at: string } {
  const at = join(state, "akasha", "deploys")
  return {
    at,
    unit,
    log: join(at, `${unit}.log`),
    ended: join(at, `${unit}.ended`),
    writer: join(at, `${unit}.ending.sh`),
  }
}

export function carried(env: Env): readonly string[] {
  return Object.keys(env)
    .filter((one) => NAME.test(one) && !UNCARRIED.has(one) && env[one] !== undefined)
    .sort()
    .map((one) => `--setenv=${one}`)
}

export function endingScript(ended: string): string {
  return `#!/bin/sh\necho "$SERVICE_RESULT $EXIT_CODE $EXIT_STATUS" > '${ended}'\n`
}

function endingWriter(writer: string): string {
  return `/bin/sh ${writer}`
}

export function startArgv(
  root: string,
  place: Place,
  words: readonly string[],
  env: Env
): readonly string[] {
  return [
    "systemd-run",
    "--user",
    "--collect",
    "--quiet",
    `--unit=${place.unit}`,
    `--working-directory=${root}`,
    `--property=RuntimeMaxSec=${String(RUNTIME_MAX_SECONDS)}`,
    `--property=StandardOutput=append:${place.log}`,
    `--property=StandardError=append:${place.log}`,
    `--property=ExecStopPost=${endingWriter(place.writer)}`,
    ...carried(env),
    `--setenv=${DETACHED}=1`,
    `--setenv=${ROOT_NAME}=${root}`,
    "--",
    join(root, LAUNCHER),
    DEPLOY,
    ...words,
  ]
}

function saidOfStart(place: Place): string {
  return `detached\t${place.unit}\t${place.log}`
}

function saidOfGoingOn(place: Place): string {
  return `the deploy goes on as \`${place.unit}\` after this call ended, and its log is at ${place.log}`
}

export function saidOfWaiting(slug: string, holder: number): string {
  return `${WAITING}\t${slug}\tbehind the deploy process ${String(holder)}`
}

export function toldWaiting(
  slug: string,
  holder: number,
  env: Env = process.env,
  write: (line: string) => void = (line) => {
    process.stdout.write(line)
  }
): undefined {
  if (env[DETACHED] === undefined) return undefined
  write(`${saidOfWaiting(slug, holder)}\n`)
  return undefined
}

export function saidOfGoingOnBehind(place: Place): string {
  return `the deploy waits in \`${place.unit}\` behind the one putting this up now and goes on after this call ends, and the end of ${place.log} says how the deploy carrying this commit ended`
}

function waitingIn(log: string): boolean {
  return existsSync(log) && WAITING_LINE.test(readFileSync(log, "utf8"))
}

function saidOfUnstarted(unit: string, out: string): string {
  return `\`${unit}\` would not start, so nothing was put up — ${out}`
}

function saidOfNoEnding(place: Place): string {
  return `\`${place.unit}\` is gone and wrote no ending, so how the deploy ended is unknown; its log is at ${place.log}`
}

export function endingIn(text: string, place: Place): Answer {
  const [result = "", how = "", status = ""] = text.trim().split(/\s+/)
  if (how === "exited") {
    const code = Number(status)
    if (status !== "" && Number.isInteger(code)) return answeredWith([], [], code)
  }
  if (how === "") return answeredWith([], [saidOfNoEnding(place)], OPERATIONAL)
  const said = `the deploy in \`${place.unit}\` was ${how} by ${status} (${result}) before it finished; its log is at ${place.log}`
  return answeredWith([], [said], OPERATIONAL)
}

function poured(log: string, from: number, write: (bytes: Uint8Array) => void): number {
  if (!existsSync(log)) return from
  const all = readFileSync(log)
  if (all.length > from) write(all.subarray(from))
  return all.length
}

function endedAt(place: Place): Answer {
  return endingIn(readFileSync(place.ended, "utf8"), place)
}

export async function followed(place: Place, following: Following): Promise<Answer> {
  let at = 0
  for (let tick = 1; ; tick += 1) {
    at = poured(place.log, at, following.write)
    if (existsSync(place.ended)) {
      poured(place.log, at, following.write)
      return endedAt(place)
    }
    if (waitingIn(place.log)) return answeredWith([saidOfGoingOnBehind(place)], [], OK)
    if (tick % ALIVE_EVERY === 0 && !following.alive(place.unit)) {
      poured(place.log, at, following.write)
      if (existsSync(place.ended)) return endedAt(place)
      return answeredWith([], [saidOfNoEnding(place)], OPERATIONAL)
    }
    await following.sleep(POLL_MS)
  }
}

function unitAlive(unit: string): boolean {
  const done = ran(["systemctl", "--user", "show", "--property=ActiveState", "--value", unit])
  return !GONE.has(done.out.trim())
}

function systemdStarting(words: readonly string[]): Started {
  const done = ran(words)
  return { code: done.code, out: `${done.out}${done.err}`.trim() }
}

const FOLLOWING: Following = {
  write: (bytes) => {
    process.stdout.write(bytes)
  },
  alive: unitAlive,
  sleep: (ms) => Bun.sleep(ms),
}

function warned(place: Place): undefined {
  for (const one of ENDING_SIGNALS) {
    try {
      process.on(one, () => {
        try {
          process.stderr.write(`${saidOfGoingOn(place)}\n`)
        } catch {}
        process.exit(OPERATIONAL)
      })
    } catch {}
  }
}

export async function detachedDeploy(
  words: readonly string[],
  slug: string,
  given: Given,
  env: Env = process.env,
  starting: Starting = systemdStarting,
  following: Following = FOLLOWING,
  now: number = Date.now()
): Promise<Answer> {
  const place = placeFor(stateHome(env), unitFor(slug, now))
  mkdirSync(place.at, { recursive: true })
  writeFileSync(place.writer, endingScript(place.ended))
  const started = starting(startArgv(given.root, place, words, env))
  if (started.code !== 0) {
    return answeredWith([], [saidOfUnstarted(place.unit, started.out)], OPERATIONAL)
  }
  allowedThrough()
  following.write(new TextEncoder().encode(`${saidOfStart(place)}\n`))
  warned(place)
  return await followed(place, following)
}
