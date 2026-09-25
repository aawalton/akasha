import type {
  TransportEvent,
  TransportLog,
} from "akasha/agent/model/gateway/modules/transport-log/transport-log.module.code.ts"

type Kept = { readonly log: TransportLog; readonly rows: readonly TransportEvent[] }

export function keptLog(): Kept {
  const rows: TransportEvent[] = []
  const log: TransportLog = {
    write: (event): undefined => {
      rows.push(event)
    },
    flushed: () => Promise.resolve(),
  }
  return { log, rows }
}
