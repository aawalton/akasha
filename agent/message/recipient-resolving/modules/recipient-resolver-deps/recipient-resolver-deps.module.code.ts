import {
  messageUnrevivableToKeeper,
  pushKeeperUnrevivableToAlan,
} from "akasha/agent/message/recipient-resolving/modules/keeper-unrevivable-push/keeper-unrevivable-push.module.code.ts"
import type { RecipientResolverConfig } from "akasha/agent/message/recipient-resolving/modules/recipient-resolver-config/recipient-resolver-config.module.code.ts"
import {
  getAgentInboundMessages,
  type InboundMessageRow,
  inboundMessagesTo,
} from "akasha/agent/message/recipient-resolving/modules/recipient-resolver-inbound/recipient-resolver-inbound.module.code.ts"
import { reviveSeat } from "akasha/agent/message/recipient-resolving/modules/recipient-resolver-revive/recipient-resolver-revive.module.code.ts"
import type {
  RecipientResolverAgentRow,
  RecipientResolverTickDeps,
} from "akasha/agent/message/recipient-resolving/modules/recipient-resolver-tick-deps/recipient-resolver-tick-deps.module.code.ts"
import { seatIdentityForName } from "akasha/agent/message/recipient-resolving/modules/seat-identity/seat-identity.module.code.ts"
import type { CommsInput } from "akasha/agent/message/recipient-resolving/modules/seat-wake-rules/seat-wake-rules.module.code.ts"
import { wakeCommsInput } from "akasha/agent/message/recipient-resolving/modules/wake-comms-input/wake-comms-input.module.code.ts"
import { SEAT_MODE_INTERACTIVE } from "akasha/agent/seat/launching/modules/seat-modes/seat-modes.module.code.ts"
import { startSeat } from "akasha/agent/seat/launching/modules/seat-start/seat-start.module.code.ts"
import { agentPresence } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import { LOG } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import { resolveRoots } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const toCommsInput = (m: InboundMessageRow): CommsInput =>
  wakeCommsInput({ senderAgentId: m.sender_agent_id, source: m.source, content: m.content })

export async function defaultRecipientResolverDeps(
  signal: AbortSignal,
  config: RecipientResolverConfig
): Promise<Omit<RecipientResolverTickDeps, "specs">> {
  const unrevivableReported = new Set<string>()
  const deps: Omit<RecipientResolverTickDeps, "specs"> = {
    resolveAgent: async (name): Promise<RecipientResolverAgentRow | null> =>
      seatIdentityForName(name, resolveRoots()),
    readInbound: async (agentId): Promise<readonly CommsInput[]> => {
      const messages = await getAgentInboundMessages(agentId)
      return messages.map(toCommsInput)
    },
    readInboundTo: async (name): Promise<readonly CommsInput[]> => {
      const messages = await inboundMessagesTo(name)
      return messages.map(toCommsInput)
    },
    startFirst: async (name, firstStart): Promise<void> => {
      const done: string[] = []
      try {
        const started = await startSeat(
          { startMode: SEAT_MODE_INTERACTIVE, ...firstStart, parent: null },
          done
        )
        if (started.name !== name) {
          console.error(
            `${LOG} recipient-resolver: '${name}' was started as '${started.name}' (${started.agentId}), so what waits for '${name}' still waits`
          )
          return
        }
        console.log(`${LOG} recipient-resolver: started '${name}' (${started.agentId})`)
      } catch (err) {
        console.error(
          `${LOG} recipient-resolver: starting '${name}' FAILED — what waits for it still waits (${done.join("; ")}):`,
          err
        )
      }
    },
    seatIsPresent: async (agentId): Promise<boolean> => {
      const presence = agentPresence(agentId)
      if (presence === "unknown") {
        console.error(
          `${LOG} recipient-resolver: ${agentId} sits in a seat whose presence cannot be established — delivering to it rather than reviving over an agent that may be live`
        )
      }
      return presence !== "absent"
    },
    revive: async (agentId, bootPrompt) => reviveSeat(agentId, bootPrompt, config),
    reportUnrevivable: async (name, agentId, tellSeat): Promise<void> => {
      if (unrevivableReported.has(agentId)) return
      const told = tellSeat === null ? "Alan" : `\`${tellSeat}\``
      unrevivableReported.add(agentId)
      try {
        if (tellSeat === null) await pushKeeperUnrevivableToAlan(name, agentId)
        else await messageUnrevivableToKeeper(tellSeat, name, agentId)
        console.log(
          `${LOG} recipient-resolver: told ${told} — ${name} (${agentId}) revive did NOT verify`
        )
      } catch (err) {
        console.error(
          `${LOG} recipient-resolver: telling ${told} about ${name} (${agentId}) failed:`,
          err
        )
      }
    },
    perSpecTimeoutMs: config.reviveTimeoutMs + config.tickMs,
    signal,
  }
  return deps
}
