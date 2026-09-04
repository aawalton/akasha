import { join } from "node:path"
import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"
import { logWriter } from "@akasha/seat-system/log-day-writing"
import { seatNameForAgent } from "@akasha/seat-system/seat-presence-read"
import { clearProxyState, writeProxyStateQuietly } from "@akasha/seat-system/seat-proxy-state"
import {
  fileSink,
  LOG_MAX_BYTES,
  pageSink,
  redirectConsoleToSink,
} from "@akasha/seat-system/supervisor-console"
import { supervisorSocketPath } from "@akasha/seat-system/supervisor-log-path"
import { type ProcessDoors, runGatewayProcess } from "../proxy-process/proxy-process.module.code.ts"
import { SURFACE, startOAuthProxy } from "../proxy-serving/proxy-serving.module.code.ts"
import { transportLogFlushed } from "../transport-log/transport-log.module.code.ts"

export const CONSOLE_SOURCE = "oauth-proxy-console"

export const CONSOLE_LOG_NAME = "oauth-proxy.log"

export function consoleSentTo(logDir: string, agentId: string): undefined {
  const toFile = fileSink(join(logDir, CONSOLE_LOG_NAME), { maxBytes: LOG_MAX_BYTES })
  const seatName = seatNameForAgent(agentId)
  const writer = seatName === null ? null : logWriter(CONSOLE_SOURCE, seatName)
  redirectConsoleToSink(writer === null ? toFile : pageSink(writer, agentId, toFile))
}

export function processSeams(): ProcessDoors {
  return {
    env: process.env,
    root: ownRepoRoot(),
    pid: process.pid,
    socketPathFor: (agentId) => supervisorSocketPath(agentId),
    consoleTo: consoleSentTo,
    started: (opts) => startOAuthProxy(opts, SURFACE),
    stateWritten: (agentId, state) => {
      writeProxyStateQuietly(agentId, state)
    },
    stateCleared: (agentId) => {
      clearProxyState(agentId)
    },
    flushed: async (): Promise<undefined> => {
      await transportLogFlushed()
      return undefined
    },
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
