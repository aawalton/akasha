import { join } from "node:path"
import {
  type ProcessDoors,
  runGatewayProcess,
} from "akasha/agent/model/gateway/modules/gateway-process/gateway-process.module.code.ts"
import {
  SURFACE,
  startOAuthProxy,
} from "akasha/agent/model/gateway/modules/gateway-serving/gateway-serving.module.code.ts"
import { followingStops } from "akasha/agent/model/gateway/modules/subagent-stops/subagent-stops.module.code.ts"
import type { TransportLog } from "akasha/agent/model/gateway/modules/transport-log/transport-log.module.code.ts"
import {
  type LogWriter,
  logWriter,
} from "akasha/agent/seat/log-day/modules/log-day-writing/log-day-writing.module.code.ts"
import {
  clearProxyState,
  writeProxyStateQuietly,
} from "akasha/agent/seat/model-gateway/modules/seat-gateway-state/seat-gateway-state.module.code.ts"
import { seatNameForAgent } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import { supervisorSocketPath } from "akasha/agent/seat/supervisor/supervisor-log/modules/path/supervisor-log-path.module.code.ts"
import {
  fileSink,
  LOG_MAX_BYTES,
  redirectConsoleToSink,
  seatPageSink,
} from "akasha/agent/seat/supervisor/supervisor-log/modules/supervisor-console/supervisor-console.module.code.ts"
import { ownRepoRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

export const CONSOLE_SOURCE = "oauth-proxy-console"

export const CONSOLE_LOG_NAME = "oauth-proxy.log"

export function consoleSentTo(logDir: string, agentId: string): undefined {
  const toFile = fileSink(join(logDir, CONSOLE_LOG_NAME), { maxBytes: LOG_MAX_BYTES })
  redirectConsoleToSink(seatPageSink(CONSOLE_SOURCE, agentId, toFile))
}

export const TRANSPORT_SOURCE = "gateway-transport"

export type TransportSeams = {
  readonly seatFor: (agentId: string) => string | null
  readonly writerFor: (source: string, seatName: string) => LogWriter
  readonly said: (line: string) => undefined
}

const TRANSPORT_SEAMS: TransportSeams = {
  seatFor: seatNameForAgent,
  writerFor: (source, seatName) => logWriter(source, seatName),
  said: (line) => {
    console.error(line)
  },
}

export function transportSentTo(
  agentId: string,
  seams: TransportSeams = TRANSPORT_SEAMS
): TransportLog {
  let writer: LogWriter | null = null
  let told: string | null = null
  const tell = (why: string): undefined => {
    if (why === told) return
    told = why
    seams.said(`[${TRANSPORT_SOURCE}] ${why}`)
  }
  return {
    write: (event): undefined => {
      if (writer === null) {
        const seatName = seams.seatFor(agentId)
        if (seatName === null) {
          return tell(`agent ${agentId} names no seat yet, so its transport rows are dropped`)
        }
        writer = seams.writerFor(TRANSPORT_SOURCE, seatName)
      }
      writer.write({ "written-at": event.ts, "agent-id": agentId, data: event })
      const refused = writer.refused()
      if (refused !== null) tell(`the seat log day refuses transport rows: ${refused}`)
    },
    flushed: () => writer?.flushed() ?? Promise.resolve(),
  }
}

export function processSeams(): ProcessDoors {
  return {
    env: process.env,
    root: ownRepoRoot(),
    pid: process.pid,
    socketPathFor: (agentId) => supervisorSocketPath(agentId),
    consoleTo: consoleSentTo,
    started: (opts) => startOAuthProxy(opts, SURFACE),
    stopsFollowed: (root, agentId) => followingStops(root, agentId),
    stateWritten: (agentId, state) => {
      writeProxyStateQuietly(agentId, state)
    },
    stateCleared: (agentId) => {
      clearProxyState(agentId)
    },
    transportFor: (agentId) => transportSentTo(agentId),
    printed: (line) => {
      process.stdout.write(line)
    },
    refused: (line) => {
      process.stderr.write(line)
    },
    threw: (line, thrown) => {
      console.error(line, thrown)
    },
    signalled: (signal, taken) => {
      process.on(signal as NodeJS.Signals, () => {
        void taken()
      })
    },
    exited: (code) => {
      process.exit(code)
    },
  }
}

if (import.meta.main) runGatewayProcess(processSeams())
