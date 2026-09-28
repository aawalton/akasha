import { startDeliveryWitness } from "akasha/agent/message/modules/delivery-witness/agent-message-delivery-witness.module.code.ts"
import {
  claimMessage,
  markInjected,
  releaseClaim,
  takeMessage,
} from "akasha/agent/message/modules/file/agent-message-file.module.code.ts"
import { watchMessagesTo } from "akasha/agent/message/modules/file-watch/agent-message-file-watch.module.code.ts"
import { seatNameForAgent } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import { transcriptOf } from "akasha/agent/seat/session/modules/seat-transcript-path/seat-transcript-path.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { STEP_SENDER } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { noticeStale } from "akasha/story/world/stories/played/turns/modules/turn-notice/turn-notice.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"
import { storyChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.ts"

const WITNESS_HEARTBEAT_MS = 30_000

const MESSAGE_SOURCE = "user"

interface DeliveredMessage {
  id: string
  content: string
  sender_agent_id: string | null
  source: string | null
}

interface ChannelServer {
  readonly server: {
    readonly notification: (message: {
      readonly method: string
      readonly params: Record<string, unknown>
    }) => Promise<void>
  }
}

interface Initializing {
  readonly server: { oninitialized?: (() => void) | undefined }
}

export function whenInitialized(server: Initializing, act: () => unknown): undefined {
  server.server.oninitialized = () => {
    void act()
  }
  return undefined
}

async function sendChannelNotification(
  server: ChannelServer,
  msg: DeliveredMessage
): Promise<void> {
  await server.server.notification({
    method: "notifications/claude/channel",
    params: {
      content: msg.content,
      meta: {
        sender: msg.sender_agent_id ?? "system",
        source_type: msg.source ?? MESSAGE_SOURCE,
        message_id: msg.id,
      },
    },
  })
}

async function deliverClaimedMessage(args: {
  row: { id: string; content: string; sender_agent_id: string | null; source: string | null }
  claim: (id: string) => Promise<boolean>
  notify: (msg: DeliveredMessage) => Promise<void>
  release: (id: string) => Promise<void>
  witness?: (id: string) => void
  logError?: (message: string, err: unknown) => void
}): Promise<void> {
  const { row, claim, notify, release } = args
  const logError = args.logError ?? ((message, err) => console.error(message, err))
  if (!(await claim(row.id))) return
  try {
    await notify({
      id: row.id,
      content: row.content,
      sender_agent_id: row.sender_agent_id,
      source: row.source,
    })
  } catch (err) {
    await release(row.id)
    logError(
      "[messages] Channel subscription render FAILED; released claim (message returned to unclaimed for redelivery):",
      err
    )
    return
  }
  args.witness?.(row.id)
}

function stepStatuses(): ReadonlyMap<string, unknown> {
  const held = new Map<string, unknown>()
  for (const type of [storyTurnPlayed.slug, storyChapterWritten.slug]) {
    for (const one of valuesOfType(akashaRoot(), type)) {
      held.set(one.path, one.value["stepStatus"])
    }
  }
  return held
}

async function dropStale(to: string, messageId: string): Promise<void> {
  if (!claimMessage(to, messageId)) return
  const taken = await takeMessage(to, messageId)
  const kept = taken.kind === "refused" ? `; its page stays held (${taken.detail})` : ""
  console.error(
    `[messages] ${messageId} is a turn notice its turn has moved past, so it is dropped rather than sent${kept}`
  )
}

export async function startChannelListener(
  server: ChannelServer,
  agentId: string
): Promise<() => void> {
  const to = seatNameForAgent(agentId)
  if (to === null) {
    throw new Error(
      `no seat page names agent ${agentId}, so there is no recipient directory to watch and ` +
        "nothing here could say which messages are this seat's"
    )
  }

  const witness = startDeliveryWitness({
    agentId,
    advance: async (messageId) => {
      const taken = await takeMessage(to, messageId)
      return taken.kind === "refused" ? taken.detail : null
    },
    currentTranscriptPath: (id) => transcriptOf(id)?.value ?? null,
    heartbeatMs: WITNESS_HEARTBEAT_MS,
    markInjected: (messageId) => {
      markInjected(to, messageId)
    },
    offerAgain: (messageId) => {
      releaseClaim(to, messageId)
      watching.offerAgain(messageId)
    },
  })

  const watching = watchMessagesTo(to, (message) =>
    message.from === STEP_SENDER && noticeStale(message.body, stepStatuses())
      ? dropStale(to, message.id)
      : deliverClaimedMessage({
          row: {
            id: message.id,
            content: message.body,
            sender_agent_id: message.from,
            source: MESSAGE_SOURCE,
          },
          claim: (messageId) => Promise.resolve(claimMessage(to, messageId)),
          notify: (msg) => sendChannelNotification(server, msg),
          release: (messageId) => Promise.resolve(releaseClaim(to, messageId)),
          witness: witness.track,
        })
  )

  return () => {
    witness.stop()
    watching.stop()
  }
}
