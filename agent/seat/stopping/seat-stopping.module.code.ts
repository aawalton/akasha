import { existsSync } from "node:fs"
import { join } from "node:path"
import { messagesTo } from "akasha/agent/messaging/modules/message-file/message-file.module.code.ts"
import { dropReadings } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import {
  seatPathForName,
  supervisorAlive,
} from "akasha/agent/seat/page/modules/seat-reading/seat-reading.module.code.ts"
import {
  movedOnto,
  namedAt,
  saidOf,
} from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { procEntries } from "akasha/code/process/modules/proc-reading/proc-reading.module.code.ts"
import { ending } from "akasha/code/process/modules/process-ending/process-ending.module.code.ts"
import {
  INPUT,
  OPERATIONAL,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import { refusalsIn } from "akasha/command/modules/applying/applying.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  everyOfType,
  typeSlugOf,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { removeUncommitted } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { slugAt, textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

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
    if (slugAt(value, PRINCIPAL) !== seatName) continue
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

export async function took(
  given: Given,
  paths: readonly string[],
  message: string,
  done: string[] = [],
  landing: Landing = runMechanicalChange
): Promise<boolean> {
  const here = paths.filter((one) => existsSync(join(given.root, one)))
  if (here.length === 0) return true
  const changes: readonly Asking[] = here.map((path) => ({ at: TAKE, given: { at: path } }))
  const landed = await landing(given.root, changes, message, { done })
  const gone = refusalsIn(landed).length === 0
  if (gone) dropReadings(given.root, here)
  return gone
}

async function tookMessages(
  given: Given,
  name: string,
  done: string[] = [],
  landing: Landing = runMechanicalChange
): Promise<number> {
  const waiting = messagesTo(name).map((one) => one.relPath)
  if (waiting.length === 0) return 0
  const gone = await took(
    given,
    waiting,
    `${name} is stopped, so the messages waiting there go with it`,
    done,
    landing
  )
  done.push(
    gone
      ? `took ${String(waiting.length)} message(s) nobody is left to read`
      : `left ${String(waiting.length)} message(s) nobody is left to read`
  )
  return waiting.length
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

export function pageLeft(name: string, page: string): string {
  return (
    `\`${name}\` was ended, and the landing taking \`${page}\` refused, so that page is still ` +
    `there naming a seat nothing runs in, and it holds the name against a fresh seat. Land what ` +
    `the refusal names, then stop \`${name}\` again`
  )
}

async function tookPage(
  given: Given,
  page: string,
  message: string,
  done: string[]
): Promise<boolean> {
  const gone = await took(given, [page], message, done)
  if (!gone) {
    done.push(`left \`${page}\` — the landing taking it refused`)
    return false
  }
  removeUncommitted(given.root, page)
  done.push(`took \`${page}\` and the uncommitted values beside it`)
  return true
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

  await tookMessages(given, name, done)

  const target = killTarget({ procPids: pids, seatName: name, selfPid: process.pid })
  if (target.kind === "signal") {
    const ended = await ending(target.pids)
    const up = stillUp(name, target.pids, ended.allGone)
    if (up !== null) return { refused: up, code: OPERATIONAL }
    done.push(`ended ${target.pids.map((pid) => String(pid)).join(", ")}`)
    const gone = await tookPage(given, page, `${name} was stopped, so the page it held goes`, done)
    if (!gone) return { refused: pageLeft(name, page), code: OPERATIONAL }
    return {
      stopped: { name, pids: target.pids, signalled: ended.asked, how: "ended", moved },
    }
  }
  if (target.kind === "session") {
    const ended = await endedSession(target.name)
    if (ended) done.push(`ended the tmux session \`${target.name}\``)
    const gone = await tookPage(
      given,
      page,
      ended
        ? `${name} was stopped by ending the session that carried it`
        : `${name} had no process and no session, so the page it held goes`,
      done
    )
    if (!gone) return { refused: pageLeft(name, page), code: OPERATIONAL }
    return {
      stopped: { name, pids: [], signalled: ended, how: ended ? "ended" : "already-gone", moved },
    }
  }
  const gone = await tookPage(given, page, `no process and no session were left for ${name}`, done)
  if (!gone) return { refused: pageLeft(name, page), code: OPERATIONAL }
  return { stopped: { name, pids: [], signalled: false, how: "reconciled", moved } }
}
