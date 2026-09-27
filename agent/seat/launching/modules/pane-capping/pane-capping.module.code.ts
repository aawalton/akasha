import {
  groupIn,
  PANE_SCOPE,
  paneScopeIn,
} from "akasha/agent/seat/launching/modules/seat-grouping/seat-grouping.module.code.ts"

const SEAT_TASKS = 2000

export const TASKS_CAP = `TasksMax=${String(SEAT_TASKS)}`

const SCOPE_WAIT_MS = 30_000

const SCOPE_POLL_MS = 100

const CGROUP_MOUNT = "/sys/fs/cgroup"

const TASKS_FILE = "pids.max"

export type Answer = { readonly code: number; readonly out: string; readonly err: string }

export type Probing = {
  readonly ran: (cmd: readonly string[]) => Promise<Answer>
  readonly at: () => number
  readonly settle: (ms: number) => Promise<void>
}

type Cap = { readonly at: string; readonly tasks: string }

export function paneCapArgv(scope: string): readonly string[] {
  return ["systemctl", "--user", "set-property", "--runtime", scope, TASKS_CAP]
}

function unitIn(own: string): string {
  const parts = own.split("/").filter((one) => one !== "")
  return [...parts].reverse().find((one) => one.includes(".")) ?? parts.at(-1) ?? own
}

async function capOver(own: string, how: Probing): Promise<Cap | null> {
  const parts = own.split("/").filter((one) => one !== "")
  for (let depth = parts.length; depth > 0; depth -= 1) {
    const at = parts.slice(0, depth).join("/")
    const read = await how.ran(["cat", `${CGROUP_MOUNT}/${at}/${TASKS_FILE}`])
    if (read.code === 0 && /^\d+$/.test(read.out)) return { at: unitIn(at), tasks: read.out }
  }
  return null
}

async function sharedCapped(name: string, own: string, how: Probing): Promise<string> {
  const cap = await capOver(own, how)
  const reach =
    cap === null
      ? "and no `pids.max` reaches it"
      : `so the \`pids.max\` of ${cap.tasks} on \`${cap.at}\` is shared by every process ` +
        `under \`${cap.at}\``
  return (
    `the pane of \`${name}\` sits in \`${unitIn(own)}\` rather than a scope of its own ` +
    `('${own}'), ${reach}`
  )
}

export async function paneCapped(name: string, pid: number, how: Probing): Promise<string | null> {
  const began = how.at()
  const read = (): Promise<Answer> => how.ran(["cat", `/proc/${String(pid)}/cgroup`])
  let group = await read()
  let scope = group.code === 0 ? paneScopeIn(group.out) : null
  while (scope === null && group.code === 0 && how.at() - began < SCOPE_WAIT_MS) {
    await how.settle(SCOPE_POLL_MS)
    group = await read()
    scope = group.code === 0 ? paneScopeIn(group.out) : null
  }
  if (group.code !== 0) {
    return `the pane of \`${name}\` was gone before its scope was read: ${group.err || group.out}`
  }
  if (scope === null) return sharedCapped(name, groupIn(group.out) ?? group.out, how)
  if (scope.startsWith(PANE_SCOPE)) return null
  const set = await how.ran(paneCapArgv(scope))
  if (set.code === 0) return null
  return (
    `\`${scope}\` for \`${name}\` would not take \`${TASKS_CAP}\` ` +
    `(exit ${String(set.code)}): ${set.err || set.out}`
  )
}
