import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import type { CommsInput } from "@akasha/seat-system/seat-wake-rules"
import { agentPresence } from "@tools/lib/seat-presence-read"
import { LOG } from "../../supervising/supervisor-config/supervisor-config.module.code.ts"
import {
  messageUnrevivableToKeeper,
  pushKeeperUnrevivableToAlan,
} from "../keeper-unrevivable-push/keeper-unrevivable-push.module.code.ts"
import type { RecipientResolverConfig } from "../recipient-resolver-config/recipient-resolver-config.module.code.ts"
import {
  getAgentInboundMessages,
  type InboundMessageRow,
} from "../recipient-resolver-inbound/recipient-resolver-inbound.module.code.ts"
import { reviveViaOps } from "../recipient-resolver-revive/recipient-resolver-revive.module.code.ts"
import type {
  RecipientResolverAgentRow,
  RecipientResolverTickDeps,
} from "../recipient-resolver-tick-deps/recipient-resolver-tick-deps.module.code.ts"
import { seatIdentityForName } from "../seat-identity/seat-identity.module.code.ts"
import { wakeCommsInput } from "../wake-comms-input/wake-comms-input.module.code.ts"

export const toCommsInput = (m: InboundMessageRow): CommsInput =>
  wakeCommsInput({ senderAgentId: m.sender_agent_id, source: m.source, content: m.content })

export function defaultRecipientResolverDeps(
  signal: AbortSignal,
  config: RecipientResolverConfig
): Omit<RecipientResolverTickDeps, "specs"> {
  const unrevivableReported = new Set<string>()
  const deps: Omit<RecipientResolverTickDeps, "specs"> = {
    resolveAgent: async (name): Promise<RecipientResolverAgentRow | null> =>
      seatIdentityForName(name, resolveRoots()),
    readInbound: async (agentId): Promise<readonly CommsInput[]> => {
      const messages = await getAgentInboundMessages(agentId)
      return messages.map(toCommsInput)
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
    revive: async (agentId, bootPrompt) => reviveViaOps(agentId, bootPrompt, config),
    reportUnrevivable: async (name, agentId, tellSeat): Promise<void> => {
      if (unrevivableReported.has(agentId)) return
      const told = tellSeat === null ? "Alan" : `\`${tellSeat}\``
      if (config.dryRun) {
        console.log(
          `${LOG} recipient-resolver: [dry-run] would tell ${told} that ${name} (${agentId}) is down and cannot be woken`
        )
        return
      }
      unrevivableReported.add(agentId)
      try {
        if (tellSeat === null) await pushKeeperUnrevivableToAlan(name, agentId)
        else messageUnrevivableToKeeper(tellSeat, name, agentId)
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
