import {
  isAgentProcessCmdline,
  isClaudeChildCmdline,
  type ProcLivenessEntry,
  UUID_RE,
} from "@akasha/seat-system/seat-proc-liveness"

export function newestProcStartMsByAgent(
  entries: readonly ProcLivenessEntry[]
): Map<string, number | null> {
  const out = new Map<string, number | null>()
  for (const { agentId, startMs, state } of entries) {
    if (!UUID_RE.test(agentId)) continue
    if (startMs === undefined) continue
    if (state === "D") continue
    const prev = out.get(agentId)
    if (prev === undefined || prev === null || startMs > prev) out.set(agentId, startMs)
  }
  return out
}

export type ClaudeChildProc = { pid: number; ppid?: number; startMs?: number }

export function claudeChildProcsByAgent(
  entries: readonly ProcLivenessEntry[]
): Map<string, ClaudeChildProc[]> {
  const byId = new Map<string, ClaudeChildProc[]>()
  for (const { agentId, cmdline, pid, ppid, startMs } of entries) {
    if (!UUID_RE.test(agentId)) continue
    if (!isClaudeChildCmdline(cmdline)) continue
    const child: ClaudeChildProc = startMs === undefined ? { pid, ppid } : { pid, ppid, startMs }
    const existing = byId.get(agentId)
    if (existing === undefined) byId.set(agentId, [child])
    else existing.push(child)
  }
  return byId
}

function newestChildPid(children: readonly ClaudeChildProc[]): number | undefined {
  const first = children[0]
  if (first === undefined) return undefined
  const timed = children.every((c) => c.startMs !== undefined)
  let best = first
  for (const c of children) {
    const a = c.startMs
    const b = best.startMs
    if (timed && a !== undefined && b !== undefined) {
      if (a > b || (a === b && c.pid > best.pid)) best = c
    } else if (!timed && c.pid > best.pid) best = c
  }
  return best.pid
}

/** The children the stated supervisor fathered, or all of them where it fathered none. */
function underSupervisor(
  children: readonly ClaudeChildProc[],
  supervisorPid: number | null
): readonly ClaudeChildProc[] {
  if (supervisorPid === null) return children
  const supervised = children.filter((c) => c.ppid === supervisorPid)
  return supervised.length > 0 ? supervised : children
}

export function supervisedClaudePids(
  children: readonly ClaudeChildProc[],
  supervisorPid: number | null
): readonly number[] {
  return underSupervisor(children, supervisorPid).map((c) => c.pid)
}

export function pickMainClaudePid(
  children: readonly ClaudeChildProc[],
  supervisorPid: number | null
): number | undefined {
  return newestChildPid(underSupervisor(children, supervisorPid))
}

/** Union-find over ppid edges, grouping an agent's processes into whole trees. */
function componentsOf(mine: readonly ProcLivenessEntry[]): {
  find: (pid: number) => number
  components: Map<number, ProcLivenessEntry[]>
} {
  const pidSet = new Set(mine.map((e) => e.pid))
  const parent = new Map<number, number>()
  for (const e of mine) parent.set(e.pid, e.pid)
  const find = (x: number): number => {
    let r = x
    for (;;) {
      const p = parent.get(r)
      if (p === undefined || p === r) return r
      r = p
    }
  }
  for (const e of mine) {
    if (e.ppid !== undefined && pidSet.has(e.ppid)) {
      const ra = find(e.pid)
      const rb = find(e.ppid)
      if (ra !== rb) parent.set(ra, rb)
    }
  }
  const components = new Map<number, ProcLivenessEntry[]>()
  for (const e of mine) {
    const root = find(e.pid)
    const group = components.get(root)
    if (group === undefined) components.set(root, [e])
    else group.push(e)
  }
  return { find, components }
}

export function selectSupersededTreePids(
  entries: readonly ProcLivenessEntry[],
  agentId: string,
  selfPid: number,
  keeperPid?: number
): readonly number[] {
  const mine = entries.filter(
    (e) => e.agentId === agentId && isAgentProcessCmdline(e.cmdline) && e.pid !== selfPid
  )
  if (mine.length === 0) return []
  const { find, components } = componentsOf(mine)
  if (components.size <= 1) return []

  const pidSet = new Set(mine.map((e) => e.pid))
  let keeperRoot: number | undefined
  if (keeperPid !== undefined && pidSet.has(keeperPid)) {
    keeperRoot = find(keeperPid)
  } else {
    let best: { root: number; startMs: number; pid: number } | undefined
    for (const [root, group] of components) {
      for (const e of group) {
        const startMs = e.startMs ?? 0
        if (
          best === undefined ||
          startMs > best.startMs ||
          (startMs === best.startMs && e.pid > best.pid)
        ) {
          best = { root, startMs, pid: e.pid }
        }
      }
    }
    keeperRoot = best?.root
  }

  const superseded: number[] = []
  for (const [root, group] of components) {
    if (root === keeperRoot) continue
    for (const e of group) superseded.push(e.pid)
  }
  return superseded.sort((a, b) => a - b)
}

/** Every pid of the invocation the caller is running inside, up to the nearest agent process. */
function selfInvocationPids(
  entries: readonly ProcLivenessEntry[],
  selfPid: number
): ReadonlySet<number> {
  const byPid = new Map<number, ProcLivenessEntry>()
  for (const e of entries) byPid.set(e.pid, e)
  const self = byPid.get(selfPid)
  if (self === undefined || isAgentProcessCmdline(self.cmdline)) return new Set([selfPid])

  let root = self
  const climbed = new Set<number>([self.pid])
  for (;;) {
    const parent = root.ppid === undefined ? undefined : byPid.get(root.ppid)
    if (parent === undefined || isAgentProcessCmdline(parent.cmdline)) break
    if (climbed.has(parent.pid)) break
    climbed.add(parent.pid)
    root = parent
  }

  const children = new Map<number, ProcLivenessEntry[]>()
  for (const e of entries) {
    if (e.ppid === undefined) continue
    const siblings = children.get(e.ppid)
    if (siblings === undefined) children.set(e.ppid, [e])
    else siblings.push(e)
  }

  const invocation = new Set<number>([selfPid, root.pid])
  const pending = [root.pid]
  for (let pid = pending.pop(); pid !== undefined; pid = pending.pop()) {
    for (const child of children.get(pid) ?? []) {
      if (invocation.has(child.pid)) continue
      if (isAgentProcessCmdline(child.cmdline)) continue
      invocation.add(child.pid)
      pending.push(child.pid)
    }
  }
  return invocation
}

export function rejectSelfProc(
  entries: readonly ProcLivenessEntry[],
  selfPid: number
): readonly ProcLivenessEntry[] {
  const invocation = selfInvocationPids(entries, selfPid)
  return entries.filter((e) => !invocation.has(e.pid))
}
