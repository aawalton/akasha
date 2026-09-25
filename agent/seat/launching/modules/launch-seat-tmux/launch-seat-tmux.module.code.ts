import { resolve } from "node:path"
import { SEAT_MODE_HEADLESS } from "akasha/agent/seat/launching/modules/seat-modes/seat-modes.module.code.ts"
import {
  envScrubArgv,
  launching,
  launchModeFlags,
  shellQuoted,
  supervisorEntryArgv,
} from "akasha/agent/seat/launching/seat-launching.module.code.ts"
import { removeSubagentPagesOf } from "akasha/agent/subagent/modules/page/subagent-page.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const TMUX_CALL_CEILING_MS = 10_000

const EARLY_EXIT_PROBE_MS = 200

export interface LaunchSeatOpts {
  readonly name: string
  readonly agentId: string
  readonly account: string
  readonly prompt: string
  readonly mode: string
  readonly resumeSessionId?: string
  readonly modelOverride?: string
  readonly anthropicBaseUrl?: string
  readonly anthropicAuthToken?: string
}

export interface LaunchSeatResult {
  readonly pid: number
}

export interface TmuxCall {
  readonly code: number
  readonly out: string
  readonly err: string
}

function seatStartDir(): string {
  return resolve(akashaRoot(), "..")
}

function buildSupervisorCmd(root: string, opts: LaunchSeatOpts): readonly string[] {
  const overrides = [
    ...(opts.modelOverride != null ? ["--model", opts.modelOverride] : []),
    ...(opts.anthropicBaseUrl != null ? ["--anthropic-base-url", opts.anthropicBaseUrl] : []),
    ...(opts.anthropicAuthToken != null ? ["--anthropic-auth-token", opts.anthropicAuthToken] : []),
  ]
  const resume =
    opts.resumeSessionId != null ? ["--session-id", opts.resumeSessionId, "--resume"] : []
  return [
    ...supervisorEntryArgv(root),
    ...launchModeFlags(opts.mode === SEAT_MODE_HEADLESS),
    "--agent-id",
    opts.agentId,
    "-a",
    opts.account,
    ...overrides,
    ...resume,
    ...(opts.prompt !== "" ? [opts.prompt] : []),
  ]
}

async function runBounded(cmd: readonly string[]): Promise<TmuxCall> {
  const proc = Bun.spawn({ cmd: [...cmd], stdout: "pipe", stderr: "pipe", env: process.env })
  const timer = setTimeout(() => {
    try {
      proc.kill(9)
    } catch {}
  }, TMUX_CALL_CEILING_MS)
  try {
    const [out, err, code] = await Promise.all([
      new Response(proc.stdout).text(),
      new Response(proc.stderr).text(),
      proc.exited,
    ])
    return { code, out: out.trim(), err: err.trim() }
  } finally {
    clearTimeout(timer)
  }
}

async function tmux(args: readonly string[]): Promise<TmuxCall> {
  return runBounded(["tmux", ...args])
}

async function sessionHolds(name: string): Promise<boolean> {
  return (await tmux(["has-session", "-t", `=${name}`])).code === 0
}

const INTERRUPTS = 2

const INTERRUPT_SETTLE_MS = 1_500

const LINE_SETTLE_MS = 250

async function paneOf(name: string): Promise<string | null> {
  const listed = await tmux(["list-panes", "-t", `=${name}`, "-F", "#{pane_id}"])
  if (listed.code !== 0) return null
  const first = listed.out.split("\n")[0] ?? ""
  return first === "" ? null : first
}

async function paneIsLive(pane: string): Promise<boolean> {
  return (await tmux(["display-message", "-p", "-t", pane, "#{pane_dead}"])).out !== "1"
}

export async function liveSessionHolds(name: string): Promise<boolean> {
  if (!(await sessionHolds(name))) return false
  const pane = await paneOf(name)
  return pane !== null && (await paneIsLive(pane))
}

export async function sendLineToSeatPane(name: string, line: string): Promise<boolean> {
  if (!(await sessionHolds(name))) return false
  const pane = await paneOf(name)
  if (pane === null || !(await paneIsLive(pane))) return false
  if ((await tmux(["send-keys", "-t", pane, "-l", line])).code !== 0) return false
  await Bun.sleep(LINE_SETTLE_MS)
  return (await tmux(["send-keys", "-t", pane, "Enter"])).code === 0
}

export async function holdSeatPaneOpen(name: string): Promise<boolean> {
  if (!(await sessionHolds(name))) return false
  const pane = await paneOf(name)
  if (pane === null) return false
  await tmux(["set-option", "-w", "-t", pane, "remain-on-exit", "on"])
  for (let i = 0; i < INTERRUPTS; i += 1) {
    await tmux(["send-keys", "-t", pane, "C-c"])
    await Bun.sleep(INTERRUPT_SETTLE_MS)
  }
  return true
}

async function sweepSubagentPagesOf(agentId: string): Promise<undefined> {
  let why: string
  try {
    const swept = await removeSubagentPagesOf(agentId, "was started again")
    if (swept.kind !== "refused") return
    why = swept.detail
  } catch (cause) {
    why = cause instanceof Error ? cause.message : String(cause)
  }
  process.stderr.write(
    `the subagent pages under '${agentId}' were not swept, so stopping it may ask for --force: ` +
      `${why}\n`
  )
}

export async function respawnSeatUnderTmux(opts: LaunchSeatOpts): Promise<boolean> {
  const name = opts.name
  if (!(await sessionHolds(name))) return false
  const pane = await paneOf(name)
  if (pane === null) return false
  await sweepSubagentPagesOf(opts.agentId)

  const cmd = buildSupervisorCmd(akashaRoot(), opts)
  const line = shellQuoted([...envScrubArgv(), `AGENT_ID=${opts.agentId}`, ...cmd])
  const spawned = await tmux(["respawn-pane", "-k", "-t", pane, "-c", seatStartDir(), line])
  if (spawned.code !== 0) {
    throw new Error(
      `failed to respawn the supervisor for '${name}' (exit ${spawned.code}): ` +
        `${spawned.err || spawned.out}`
    )
  }

  await Bun.sleep(EARLY_EXIT_PROBE_MS)
  const dead = await tmux(["list-panes", "-t", `=${name}`, "-F", "#{pane_dead}"])
  if (dead.out.split("\n")[0] === "1") {
    throw new Error(
      `seat '${name}' exited immediately on boot, and its pane stands dead rather than taking the ` +
        `session with it — attach with \`tmux attach -t =${name}\` to read what it says`
    )
  }
  return true
}

export async function killSeatSession(name: string): Promise<boolean> {
  if (!(await sessionHolds(name))) return false
  await tmux(["kill-session", "-t", `=${name}`])
  return !(await sessionHolds(name))
}

export async function launchSeatUnderTmux(opts: LaunchSeatOpts): Promise<LaunchSeatResult> {
  const name = opts.name
  if (await sessionHolds(name)) {
    const held = await paneOf(name)
    const dead =
      held === null ? null : await tmux(["display-message", "-p", "-t", held, "#{pane_dead}"])
    if (held !== null && dead?.out === "1") {
      await respawnSeatUnderTmux(opts)
      const revived = await tmux(["display-message", "-p", "-t", held, "#{pane_pid}"])
      const back = Number.parseInt(revived.out, 10)
      if (!Number.isSafeInteger(back) || back <= 0) {
        throw new Error(`respawned '${name}' into its standing pane but it reported no pid`)
      }
      return { pid: back }
    }
    throw new Error(
      `refusing to launch '${name}': a live tmux session already holds that name. Two seats ` +
        `under one session name are one taking the other's work. Attach with \`tmux attach -t ` +
        `=${name}\` to see what is there, or kill it first.`
    )
  }

  await sweepSubagentPagesOf(opts.agentId)

  const begun = await launching(opts, akashaRoot())
  if ("refused" in begun) throw new Error(begun.refused)
  if (begun.launched.uncapped !== null) {
    process.stderr.write(`\`${name}\` is up with no cap on its tasks: ${begun.launched.uncapped}\n`)
  }
  return { pid: begun.launched.pid }
}
