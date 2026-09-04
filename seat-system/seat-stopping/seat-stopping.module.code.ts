import { existsSync } from "node:fs"
import { join } from "node:path"
import { landingAsked, wroteAndTook } from "@akasha/command-system/asking"
import type { Given } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import { dropReadings } from "@akasha/command-system/reading"
import { everyOfType, typeSlugOf } from "@akasha/indexes"
import { removeUncommitted } from "@akasha/pages-system/page-uncommitted"
import { textAt, valueAt } from "@akasha/pages-system/page-value"
import { procEntries } from "@akasha/utils-process/proc-reading"
import { ending } from "@akasha/utils-process/process-ending"
import { seatPathForName, supervisorAlive } from "../seat-reading/seat-reading.module.code.ts"

const SUBAGENT_TYPE = "01a05978-f2e1-78e7-9017-ab14c5c1d79b"

const SUBAGENTS_AT = "seat-system/subagents/pages"

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

export function agentPids(agentId: string): readonly number[] {
  const found: number[] = []
  for (const one of procEntries([AGENT_ID]).entries) {
    if (one.named[AGENT_ID] !== agentId) continue
    if (!isAgentProcess(one.cmdline)) continue
    found.push(one.pid)
  }
  return found
}

export function subagentsOf(root: string, seatName: string): readonly Working[] {
  const found: Working[] = []
  for (const one of everyOfType(root, typeSlugOf(root, SUBAGENT_TYPE))) {
    if (!one.path.startsWith(SUBAGENTS_AT)) continue
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

export async function endedSession(name: string): Promise<boolean> {
  if (!(await sessionHeld(name))) return false
  await tmux(["kill-session", "-t", `=${name}`])
  return !(await sessionHeld(name))
}

async function handed(
  given: Given,
  changes: readonly FileEdit[],
  message: string
): Promise<boolean> {
  return (
    (await landingAsked(given, {
      changes,
      message,
      dryRun: false,
      glass: null,
      unmoved: [],
      saying: wroteAndTook,
    }).code) === 0
  )
}

export function took(given: Given, paths: readonly string[], message: string): boolean {
  const here = paths.filter((one) => existsSync(join(given.root, one)))
  if (here.length === 0) return true
  const gone = handed(
    given,
    here.map((path) => ({ path, body: null })),
    message
  )
  if (gone) dropReadings(given.root, here)
  return gone
}

export type Stopped = {
  readonly name: string
  readonly pids: readonly number[]
  readonly signalled: boolean
  readonly how: "ended" | "already-gone" | "reconciled"
}

export type Stopping = { readonly stopped: Stopped } | { readonly refused: string }

export async function stopping(
  given: Given,
  agentId: string,
  name: string,
  force: boolean
): Promise<Stopping> {
  const page = seatPathForName(name)
  const pids = agentPids(agentId)
  const seatAlive = pids.length > 0 || supervisorAlive(given.root, page)
  const working = subagentsOf(given.root, name)
  const guard = subagentGuard({ working, seatAlive, force, seatName: name })
  if (guard.kind === "refuse") return { refused: guard.said }

  took(
    given,
    working.map((one) => one.path),
    `${name} is stopped, so what it dispatched goes with it`
  )

  const target = killTarget({ procPids: pids, seatName: name, selfPid: process.pid })
  if (target.kind === "signal") {
    const ended = await ending(target.pids)
    if (ended.allGone) {
      removeUncommitted(given.root, page)
      took(given, [page], `${name} was stopped, so the page it held goes`)
    }
    return {
      stopped: { name, pids: target.pids, signalled: ended.asked, how: "ended" },
    }
  }
  if (target.kind === "session") {
    const ended = await endedSession(target.name)
    removeUncommitted(given.root, page)
    took(
      given,
      [page],
      ended
        ? `${name} was stopped by ending the session that carried it`
        : `${name} had no process and no session, so the page it held goes`
    )
    return {
      stopped: { name, pids: [], signalled: ended, how: ended ? "ended" : "already-gone" },
    }
  }
  removeUncommitted(given.root, page)
  took(given, [page], `no process and no session were left for ${name}`)
  return { stopped: { name, pids: [], signalled: false, how: "reconciled" } }
}
