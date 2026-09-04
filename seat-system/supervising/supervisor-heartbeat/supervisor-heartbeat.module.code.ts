import { LOG } from "@akasha/seat-system/supervisor-config"
import { recordHeartbeat } from "../supervisor-heartbeat-beat/supervisor-heartbeat-beat.module.code.ts"

export const HEARTBEAT_INTERVAL_MS = 30_000

export interface HeartbeatPoll {
  readonly name: string
  readonly run: () => Promise<void>
}

export function buildHeartbeatMonitor(args: {
  getAgentId: () => string | null
  registrationAccount?: string
  polls: readonly HeartbeatPoll[]
}): {
  heartbeatTimer: ReturnType<typeof setInterval>
} {
  const { getAgentId, polls } = args
  const account = args.registrationAccount ?? null

  const beat = (): undefined => {
    const id = getAgentId()
    if (id != null) {
      void (async () => {
        try {
          await recordHeartbeat(id, account)
        } catch (err) {
          console.error(`${LOG} heartbeat: recordHeartbeat threw:`, err)
        }
      })()
    }
    for (const poll of polls) {
      void (async () => {
        try {
          await poll.run()
        } catch (err) {
          console.error(`${LOG} heartbeat: the ${poll.name} poll threw:`, err)
        }
      })()
    }
  }

  beat()
  const heartbeatTimer = setInterval(beat, HEARTBEAT_INTERVAL_MS)
  return { heartbeatTimer }
}
