import { resolve } from "node:path"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { sessionHeld } from "../seat-stopping/seat-stopping.module.code.ts"

export const TMUX_HISTORY_LIMIT = "50000"

export const PTY_PROXY_REL = "seat-system/pty-proxy/pty-proxy.module.code.ts"

export const SUPERVISOR_REL = "seat-system/run-supervisor/run-supervisor.module.code.ts"

export const SEAT_RESUME_REL = "seat-system/seat-resume/seat-resume.module.code.ts"

export const SEAT_MODE_INTERACTIVE = "interactive"

export const SEAT_MODE_HEADLESS = "headless"

export const SEAT_MODES: readonly string[] = [SEAT_MODE_INTERACTIVE, SEAT_MODE_HEADLESS]

export const DEFAULT_ACCOUNT = "aawalton"

const AGENT_ID_ENV = "AGENT_ID"

const HEADLESS_FLAG = "--headless"

const SCOPE_COMMAND = "systemd-run"

const SEAT_CORES = 8

const SEAT_SHARE = 100

const SEAT_TASKS = 2000

const SCOPE_FLAGS: readonly string[] = [
  "--user",
  "--scope",
  "--collect",
  "--quiet",
  "-p",
  `CPUQuota=${String(SEAT_CORES * 100)}%`,
  "-p",
  `CPUWeight=${String(SEAT_SHARE)}`,
  "-p",
  `TasksMax=${String(SEAT_TASKS)}`,
]

const ENV_SCRUB: readonly string[] = ["env", "-u", "TMUX", "-u", "TMUX_PANE"]

const SERVER_OPTIONS: readonly (readonly string[])[] = [
  ["set-option", "-g", "history-limit", TMUX_HISTORY_LIMIT],
  ["set-option", "-g", "status", "off"],
  ["set-option", "-g", "remain-on-exit", "failed"],
]

const CALL_CEILING_MS = 10_000

const BOOT_PROBE_MS = 200

export type SeatLaunch = {
  readonly name: string
  readonly agentId: string
  readonly prompt: string
  readonly mode: string
  readonly account?: string
  readonly resumeSessionId?: string
  readonly modelOverride?: string
  readonly anthropicBaseUrl?: string
  readonly anthropicAuthToken?: string
}

export function isSeatMode(value: string): boolean {
  return SEAT_MODES.includes(value)
}

export function accountFor(asked: SeatLaunch): string {
  const named = asked.account
  return named === undefined || named === "" ? DEFAULT_ACCOUNT : named
}

export function serverOptionArgv(): readonly string[] {
  return SERVER_OPTIONS.flatMap((one) => [...one, ";"])
}

export function serverOptionShell(): string {
  return SERVER_OPTIONS.map((one) => one.join(" ")).join(" \\; ")
}

export function envScrubArgv(): readonly string[] {
  return [...ENV_SCRUB]
}

export function envScrubShell(): string {
  return ENV_SCRUB.join(" ")
}

export function scopeArgv(unit: string): readonly string[] {
  return [SCOPE_COMMAND, ...SCOPE_FLAGS, `--unit=${unit}`]
}

export function scopeShell(unitExpansion: string): string {
  return [SCOPE_COMMAND, ...SCOPE_FLAGS, unitExpansion].join(" ")
}

export function scopeUnitFor(name: string, at: number): string {
  return `tmux-seat-${name}-${String(at)}`
}

export function supervisorEntryArgv(root: string): readonly string[] {
  return ["bun", "run", `${root}/${PTY_PROXY_REL}`, "--", "bun", "run", `${root}/${SUPERVISOR_REL}`]
}

export function supervisorEntryShell(proxy: string, supervisor: string): string {
  return ["bun", "run", proxy, "--", "bun", "run", supervisor].join(" ")
}

export function launchModeFlags(headless: boolean): readonly string[] {
  return headless ? [HEADLESS_FLAG] : []
}

export function seatStartDir(root: string = akashaRoot()): string {
  return resolve(root, "..")
}

export function shellQuoted(argv: readonly string[]): string {
  return argv.map((one) => `'${one.replaceAll("'", "'\\''")}'`).join(" ")
}

export function supervisorArgv(root: string, asked: SeatLaunch): readonly string[] {
  return [
    ...supervisorEntryArgv(root),
    ...launchModeFlags(asked.mode === SEAT_MODE_HEADLESS),
    "--agent-id",
    asked.agentId,
    "-a",
    accountFor(asked),
    ...(asked.modelOverride != null ? ["--model", asked.modelOverride] : []),
    ...(asked.anthropicBaseUrl != null ? ["--anthropic-base-url", asked.anthropicBaseUrl] : []),
    ...(asked.anthropicAuthToken != null
      ? ["--anthropic-auth-token", asked.anthropicAuthToken]
      : []),
    ...(asked.resumeSessionId != null ? ["--session-id", asked.resumeSessionId, "--resume"] : []),
    ...(asked.prompt !== "" ? [asked.prompt] : []),
  ]
}

export function newSessionArgv(
  asked: SeatLaunch,
  startDir: string,
  cmd: readonly string[]
): readonly string[] {
  return [
    "new-session",
    "-d",
    "-s",
    asked.name,
    "-c",
    startDir,
    "--",
    ...envScrubArgv(),
    `${AGENT_ID_ENV}=${asked.agentId}`,
    ...cmd,
  ]
}

export function underScope(
  newSession: readonly string[],
  scopeUnit: string | null
): readonly string[] {
  if (scopeUnit === null) return ["tmux", ...newSession]
  return [...scopeArgv(scopeUnit), "tmux", ...serverOptionArgv(), ...newSession]
}

export function launchArgv(input: {
  readonly asked: SeatLaunch
  readonly root: string
  readonly startDir: string
  readonly scopeUnit: string | null
}): readonly string[] {
  return underScope(
    newSessionArgv(input.asked, input.startDir, supervisorArgv(input.root, input.asked)),
    input.scopeUnit
  )
}

export function pidIn(said: string): number | null {
  const pid = Number.parseInt(said, 10)
  return Number.isSafeInteger(pid) && pid > 0 ? pid : null
}

export type Answer = { readonly code: number; readonly out: string; readonly err: string }

async function answerOf(cmd: readonly string[]): Promise<Answer> {
  const ran = Bun.spawn({ cmd: [...cmd], stdin: "ignore", stdout: "pipe", stderr: "pipe" })
  const timer = setTimeout(() => {
    ran.kill()
  }, CALL_CEILING_MS)
  try {
    const [out, err, code] = await Promise.all([
      new Response(ran.stdout).text(),
      new Response(ran.stderr).text(),
      ran.exited,
    ])
    return { code, out: out.trim(), err: err.trim() }
  } finally {
    clearTimeout(timer)
  }
}

export type Spawning = {
  readonly ran: (cmd: readonly string[]) => Promise<Answer>
  readonly held: (name: string) => Promise<boolean>
  readonly at: () => number
  readonly settle: (ms: number) => Promise<void>
}

export const SPAWNING: Spawning = {
  ran: answerOf,
  held: sessionHeld,
  at: () => Date.now(),
  settle: (ms) => Bun.sleep(ms),
}

async function serverUp(how: Spawning): Promise<boolean> {
  return (await how.ran(["tmux", "list-sessions"])).code === 0
}

async function paneOf(how: Spawning, name: string): Promise<string | null> {
  const listed = await how.ran(["tmux", "list-panes", "-t", `=${name}`, "-F", "#{pane_id}"])
  if (listed.code !== 0) return null
  const first = listed.out.split("\n")[0] ?? ""
  return first === "" ? null : first
}

export type Launching =
  | { readonly launched: { readonly name: string; readonly pid: number } }
  | { readonly refused: string }

export async function launching(
  asked: SeatLaunch,
  root: string = akashaRoot(),
  how: Spawning = SPAWNING
): Promise<Launching> {
  const name = asked.name
  if (await how.held(name)) {
    return {
      refused:
        `\`${name}\` is already carried by a live tmux session. Two seats under one session ` +
        `name are one taking the other's work. Read it with \`tmux attach -t =${name}\`, or ` +
        "stop it first",
    }
  }

  const scopeUnit = (await serverUp(how)) ? null : scopeUnitFor(name, how.at())
  const startDir = seatStartDir(root)
  const started = await how.ran(launchArgv({ asked, root, startDir, scopeUnit }))
  if (started.code !== 0) {
    return {
      refused:
        `tmux would not start a session for \`${name}\` (exit ${String(started.code)}): ` +
        `${started.err || started.out}`,
    }
  }

  const pane = await paneOf(how, name)
  if (pane !== null) {
    await how.ran(["tmux", "set-option", "-w", "-t", pane, "remain-on-exit", "on"])
  }

  const said = await how.ran(["tmux", "display-message", "-p", "-t", `=${name}`, "#{pane_pid}"])
  const pid = pidIn(said.out)
  if (pid === null) {
    return {
      refused:
        `the tmux session for \`${name}\` began but named no pane pid ('${said.out}'), so ` +
        "nothing was recorded for a liveness read",
    }
  }

  await how.settle(BOOT_PROBE_MS)
  if (!(await how.held(name))) {
    return {
      refused:
        `\`${name}\` exited as soon as it began — read it with \`tmux attach -t =${name}\` ` +
        "while it is up to see what it says",
    }
  }

  return { launched: { name, pid } }
}
