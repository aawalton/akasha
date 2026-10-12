import { join } from "node:path"
import { ANTHROPIC } from "akasha/agent/model/account/modules/reading/model-account-reading.module.code.ts"
import { provider } from "akasha/agent/model/account/properties/provider.relation-property.ts"
import {
  type ProcessDoors,
  runGatewayProcess,
} from "akasha/agent/model/gateway/modules/gateway-process/gateway-process.module.code.ts"
import {
  SURFACE,
  startOAuthProxy,
} from "akasha/agent/model/gateway/modules/gateway-serving/gateway-serving.module.code.ts"
import {
  type ChosenRead,
  type ProviderRead,
  providerReadIn,
} from "akasha/agent/model/gateway/modules/provider-upstream/provider-upstream.module.code.ts"
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
import {
  akashaRoot,
  akashaSeatPathForAgent,
} from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import { seatNameForAgent } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import { supervisorSocketPath } from "akasha/agent/seat/supervisor/supervisor-log/modules/path/supervisor-log-path.module.code.ts"
import {
  fileSink,
  LOG_MAX_BYTES,
  redirectConsoleToSink,
  seatPageSink,
} from "akasha/agent/seat/supervisor/supervisor-log/modules/supervisor-console/supervisor-console.module.code.ts"
import { ownRepoRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { secretsIn } from "akasha/page/modules/secret/page-secret.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

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

export type ChoiceSeams = {
  readonly seatFor: (agentId: string) => string | null
  readonly providerAt: (seat: string) => string | null | undefined
  readonly upstreamOf: ProviderRead
  readonly said: (line: string) => undefined
}

export function choiceSeamsIn(root: string): ChoiceSeams {
  return {
    seatFor: akashaSeatPathForAgent,
    providerAt: (seat) => {
      const values = valueAt(seat, akashaRoot())
      return values === null ? undefined : textAt(values, provider.propertySlug)
    },
    upstreamOf: providerReadIn(root, secretsIn),
    said: (line) => {
      console.error(line)
    },
  }
}

export function chosenFor(agentId: string, logPrefix: string, seams: ChoiceSeams): ChosenRead {
  let seat: string | null = null
  const unresolved = new Set<string>()
  const named = (): string | null => {
    const held = seat === null ? undefined : seams.providerAt(seat)
    if (held !== undefined) return held
    seat = seams.seatFor(agentId)
    return seat === null ? null : (seams.providerAt(seat) ?? null)
  }
  const tell = (line: string): null => {
    if (unresolved.has(line)) return null
    unresolved.add(line)
    seams.said(`${logPrefix} ${line}`)
    return null
  }
  return () => {
    let chosen: string | null
    try {
      chosen = named()
    } catch (thrown) {
      const said = thrown instanceof Error ? thrown.message : String(thrown)
      return tell(`the seat's provider could not be read, so the Anthropic accounts serve: ${said}`)
    }
    if (chosen === null || chosen === ANTHROPIC) return null
    const upstream = seams.upstreamOf(chosen)
    if (upstream !== null) return upstream
    return tell(
      `the seat chose ${chosen}, which has no account or no key, so the Anthropic accounts serve`
    )
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
    chosenFor: (root, agentId, logPrefix) => chosenFor(agentId, logPrefix, choiceSeamsIn(root)),
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
