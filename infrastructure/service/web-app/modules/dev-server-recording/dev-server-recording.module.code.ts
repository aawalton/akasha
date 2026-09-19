import type { DevServerState } from "akasha/infrastructure/service/web-app/modules/dev-server-stating/dev-server-stating.module.code.ts"

export interface DevServerRecord {
  readonly commit: string | null
  readonly app: string
  readonly port: number | null
  readonly pid: number | null
  readonly status: "running" | "stopped"
  readonly started_at: string | null
  readonly tree_path: string | null
  readonly log_path: string | null
}

export function recordFromState(state: DevServerState, alive: boolean): DevServerRecord {
  return {
    commit: state.commit,
    app: state.app,
    port: state.port,
    pid: state.pid,
    status: alive ? "running" : "stopped",
    started_at: state.started_at,
    tree_path: state.tree_path,
    log_path: state.log_path,
  }
}

export function stoppedRecord(commit: string, app: string): DevServerRecord {
  return {
    commit,
    app,
    port: null,
    pid: null,
    status: "stopped",
    started_at: null,
    tree_path: null,
    log_path: null,
  }
}

export function devServerTsvLine(record: DevServerRecord): string {
  const commit = record.commit === null ? "-" : record.commit.slice(0, 12)
  const port = record.port === null ? "-" : String(record.port)
  const pid = record.pid === null ? "-" : String(record.pid)
  const startedAt = record.started_at ?? "-"
  return `${commit}\t${record.app}\t${port}\t${pid}\t${record.status}\t${startedAt}`
}
