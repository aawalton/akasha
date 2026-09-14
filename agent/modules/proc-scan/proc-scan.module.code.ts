import { readdirSync, readFileSync, statSync } from "node:fs"
import type { ProcLivenessEntry } from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.code.ts"
import { rejectSelfProc } from "akasha/agent/modules/proc-tree/agent-proc-tree.module.code.ts"

function extractEnvironVar(environ: string, key: string): string | undefined {
  const prefix = `${key}=`
  for (const entry of environ.split("\0")) {
    if (entry.startsWith(prefix)) return entry.slice(prefix.length)
  }
  return undefined
}

function readProcPpid(pid: string): number | undefined {
  let stat: string
  try {
    stat = readFileSync(`/proc/${pid}/stat`).toString("utf8")
  } catch {
    return undefined
  }
  const close = stat.lastIndexOf(")")
  if (close === -1) return undefined
  const rest = stat
    .slice(close + 1)
    .trim()
    .split(/\s+/)
  const ppidTok = rest[1]
  const ppidNum = ppidTok !== undefined ? Number(ppidTok) : Number.NaN
  return Number.isInteger(ppidNum) ? ppidNum : undefined
}

export function scanProcEntries(
  listProcPids: () => readonly string[] = () => readdirSync("/proc")
): { ok: boolean; entries: readonly ProcLivenessEntry[] } {
  let pids: readonly string[]
  try {
    pids = listProcPids()
  } catch (err) {
    console.error("[local] proc-scan: /proc could not be read, so nothing is observable:", err)
    return { ok: false, entries: [] }
  }
  const entries: ProcLivenessEntry[] = []
  for (const name of pids) {
    if (!/^\d+$/.test(name)) continue
    let environ: string
    try {
      environ = readFileSync(`/proc/${name}/environ`).toString("utf8")
    } catch {
      continue
    }
    const agentId = extractEnvironVar(environ, "AGENT_ID")
    if (agentId === undefined) continue
    const actingAgentId = extractEnvironVar(environ, "ACTING_AGENT_ID")
    let cmdline: string
    try {
      cmdline = readFileSync(`/proc/${name}/cmdline`).toString("utf8").split("\0").join(" ")
    } catch {
      continue
    }
    const st = statSync(`/proc/${name}`, { throwIfNoEntry: false })
    entries.push({
      agentId,
      actingAgentId,
      cmdline,
      pid: Number(name),
      startMs: st ? st.mtimeMs : undefined,
      ppid: readProcPpid(name),
    })
  }
  return { ok: true, entries: rejectSelfProc(entries, process.pid) }
}
