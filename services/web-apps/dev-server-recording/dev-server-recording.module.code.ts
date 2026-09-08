import type { DevServerState } from "../dev-server-stating/dev-server-stating.module.code.ts"

export interface DevServerRecord {
  readonly seq: number | null
  readonly app: string
  readonly port: number | null
  readonly pid: number | null
  readonly status: "running" | "stopped"
  readonly started_at: string | null
  readonly worktree_path: string | null
  readonly log_path: string | null
}

export function recordFromState(state: DevServerState, alive: boolean): DevServerRecord {
  return {
    seq: state.seq,
    app: state.app,
    port: state.port,
    pid: state.pid,
    status: alive ? "running" : "stopped",
    started_at: state.started_at,
    worktree_path: state.worktree_path,
    log_path: state.log_path,
  }
}

export function stoppedRecord(seq: number, app: string): DevServerRecord {
  return {
    seq,
    app,
    port: null,
    pid: null,
    status: "stopped",
    started_at: null,
    worktree_path: null,
    log_path: null,
  }
}

export function devServerTsvLine(record: DevServerRecord): string {
  const seq = record.seq === null ? "-" : String(record.seq)
  const port = record.port === null ? "-" : String(record.port)
  const pid = record.pid === null ? "-" : String(record.pid)
  const startedAt = record.started_at ?? "-"
  return `${seq}\t${record.app}\t${port}\t${pid}\t${record.status}\t${startedAt}`
}
