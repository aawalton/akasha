import { existsSync } from "node:fs"
import { join } from "node:path"
import { dropReadings } from "akasha/agents/read-record/read-record.module.code.ts"
import {
  seatPathForName,
  supervisorAlive,
} from "akasha/agents/seats/modules/reading/seat-reading.module.code.ts"
import {
  movedOnto,
  namedAt,
  saidOf,
} from "akasha/agents/subagents/modules/recovering/subagent-recovering.module.code.ts"
import type { Asking } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  landedMechanically,
  type runMechanicalChange,
} from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  INPUT,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { everyOfType, typeSlugOf } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { removeUncommitted } from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { procEntries } from "akasha/utils/process/proc-reading/proc-reading.module.code.ts"
import { ending } from "akasha/utils/process/process-ending/process-ending.module.code.ts"

const SUBAGENT_TYPE = "01a05978-f2e1-78e7-9017-ab14c5c1d79b"

const AGENT_ID = "AGENT_ID"

const PRINCIPAL = "principalSeatName"

const DISPATCHED = "dispatchedAs"

const TMUX_CEILING_MS = 10_000

const CLIENT = /\bclaude\b.*--dangerously-skip-permissions/

const SUPERVISOR = /^(?:\S*\/)?bun\b.*supervisor\.ts/

export function isAgentProcess(cmdline: string): boolean {
  return CLIENT.test(cmdline) || SUPERVISOR.test(cmdline)
}

export type KillTarget =
  | { readonly kind: "signal"; readonly pids: readonly number[] }
  | { readonly kind: "session"; readonly name: string }
  | { readonly kind: "reconcile" }

export function killTarget(input: {
  readonly procPids: readonly number[]
  readonly seatName: string | null
  readonly selfPid: number
}): KillTarget {
  const targets = input.procPids.filter((pid) => pid !== input.selfPid)
  if (targets.length > 0) return { kind: "signal", pids: targets }
  if (input.seatName !== null) return { kind: "session", name: input.seatName }
  return { kind: "reconcile" }
}

export type Working = {
  readonly path: string
  readonly dispatchedAs: string
}

export type Guard = { readonly kind: "allow" } | { readonly kind: "refuse"; readonly said: string }

export function subagentGuard(input: {
  readonly working: readonly Working[]
  readonly seatAlive: boolean
  readonly force: boolean
  readonly seatName: string
}): Guard {
  if (!input.seatAlive) return { kind: "allow" }
  if (input.working.length === 0) return { kind: "allow" }
  if (input.force) return { kind: "allow" }
  const many = input.working.length !== 1
  const kinds = [...new Set(input.working.map((one) => one.dispatchedAs))].sort().join(", ")
  return {
    kind: "refuse",
    said:
      `\`${input.seatName}\` has ${String(input.working.length)} subagent${many ? "s" : ""} ` +
      `working (${kinds}). Stopping it ends ${many ? "them" : "it"}, and nothing will report ` +
      `what ${many ? "they were" : "it was"} doing. Wait for ${many ? "them" : "it"} to return, ` +
      `or say \`--force\` to end ${many ? "them" : "it"} with the seat`,
  }
}

function agentPids(agentId: string): readonly number[] {
  const found: number[] = []
  for (const one of procEntries([AGENT_ID]).entries) {
    if (one.named[AGENT_ID] !== agentId) continue
    if (!isAgentProcess(one.cmdline)) continue
    found.push(one.pid)
  }
  return found
}

function subagentsOf(root: string, seatName: string): readonly Working[] {
  const found: Working[] = []
  for (const one of everyOfType(root, typeSlugOf(root, SUBAGENT_TYPE))) {
    const value = valueAt(one.path, root)
    if (value === null) continue
    if (textAt(value, PRINCIPAL) !== seatName) continue
    found.push({ path: one.path, dispatchedAs: textAt(value, DISPATCHED) ?? "" })
  }
  return found
}

async function tmux(args: readonly string[]): Promise<number> {
  const ran = Bun.spawn(["tmux", ...args], { stdin: "ignore", stdout: "ignore", stderr: "ignore" })
  const timer = setTimeout(() => {
    ran.kill()
  }, TMUX_CEILING_MS)
  try {
    return await ran.exited
  } finally {
    clearTimeout(timer)
  }
}

export async function sessionHeld(name: string): Promise<boolean> {
  return (await tmux(["has-session", "-t", `=${name}`])) === 0
}

async function endedSession(name: string): Promise<boolean> {
  if (!(await sessionHeld(name))) return false
  await tmux(["kill-session", "-t", `=${name}`])
  return !(await sessionHeld(name))
}

export const TAKE = "change-mechanical/remove-file-of-any-kind"

export type Landing = (
  done: string[],
  root: string,
  changes: readonly Asking[],
  message: string
) => ReturnType<typeof runMechanicalChange>

export async function took(
  given: Given,
  paths: readonly string[],
  message: string,
  done: string[] = [],
  landing: Landing = landedMechanically
): Promise<boolean> {
  const here = paths.filter((one) => existsSync(join(given.root, one)))
  if (here.length === 0) return true
  const changes: readonly Asking[] = here.map((path) => ({ at: TAKE, given: { at: path } }))
  const landed = await landing(done, given.root, changes, message)
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  const gone = wrong.length === 0
  if (gone) dropReadings(given.root, here)
  return gone
}

export function moving(given: Given, page: string, working: readonly Working[]): readonly string[] {
  if (!existsSync(join(given.root, page))) return []
  const said: string[] = []
  for (const one of working) {
    said.push(...saidOf(namedAt(one.path), movedOnto(given.root, page, one.path)))
  }
  return said
}

export type Stopped = {
  readonly name: string
  readonly pids: readonly number[]
  readonly signalled: boolean
  readonly how: "ended" | "already-gone" | "reconciled"
  readonly moved: readonly string[]
}

export type Stopping =
  | { readonly stopped: Stopped }
  | { readonly refused: string; readonly code: number }

export function stillUp(name: string, pids: readonly number[], allGone: boolean): string | null {
  if (allGone) return null
  const drawn = pids.map((pid) => String(pid)).join(", ")
  return (
    `\`${name}\` was signalled at ${drawn} and did not all end, so the seat is up yet and ` +
    "the page it holds is kept rather than taken"
  )
}

async function tookPage(
  given: Given,
  page: string,
  message: string,
  done: string[]
): Promise<void> {
  removeUncommitted(given.root, page)
  done.push(`took the uncommitted values beside \`${page}\``)
  const gone = await took(given, [page], message, done)
  done.push(gone ? `took \`${page}\`` : `left \`${page}\` — the landing taking it refused`)
}

export async function stopping(
  given: Given,
  agentId: string,
  name: string,
  force: boolean,
  done: string[] = []
): Promise<Stopping> {
  const page = seatPathForName(name)
  const pids = agentPids(agentId)
  const seatAlive = pids.length > 0 || supervisorAlive(given.root, page)
  const working = subagentsOf(given.root, name)
  const guard = subagentGuard({ working, seatAlive, force, seatName: name })
  if (guard.kind === "refuse") return { refused: guard.said, code: INPUT }

  const moved = moving(given, page, working)
  if (moved.length > 0) done.push(`moved onto \`${name}\` what its subagents left unlanded`)
  if (working.length > 0) {
    const swept = await took(
      given,
      working.map((one) => one.path),
      `${name} is stopped, so what it dispatched goes with it`,
      done
    )
    const many = String(working.length)
    done.push(swept ? `took ${many} subagent page(s)` : `left ${many} subagent page(s)`)
  }

  const target = killTarget({ procPids: pids, seatName: name, selfPid: process.pid })
  if (target.kind === "signal") {
    const ended = await ending(target.pids)
    const up = stillUp(name, target.pids, ended.allGone)
    if (up !== null) return { refused: up, code: OPERATIONAL }
    done.push(`ended ${target.pids.map((pid) => String(pid)).join(", ")}`)
    await tookPage(given, page, `${name} was stopped, so the page it held goes`, done)
    return {
      stopped: { name, pids: target.pids, signalled: ended.asked, how: "ended", moved },
    }
  }
  if (target.kind === "session") {
    const ended = await endedSession(target.name)
    if (ended) done.push(`ended the tmux session \`${target.name}\``)
    await tookPage(
      given,
      page,
      ended
        ? `${name} was stopped by ending the session that carried it`
        : `${name} had no process and no session, so the page it held goes`,
      done
    )
    return {
      stopped: { name, pids: [], signalled: ended, how: ended ? "ended" : "already-gone", moved },
    }
  }
  await tookPage(given, page, `no process and no session were left for ${name}`, done)
  return { stopped: { name, pids: [], signalled: false, how: "reconciled", moved } }
}
