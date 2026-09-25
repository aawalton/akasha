import type {
  ApnsPayload,
  ApnsSender,
} from "akasha/alan/harness/alanwalton-ios-notification/modules/apns-sending/apns-sending.module.code.ts"
import {
  listActivityTokens,
  liveActivityTopic,
  onTheWorkstation,
  pruneDeviceToken,
} from "akasha/alan/harness/alanwalton-ios-notification/modules/push-device-tokens/push-device-tokens.module.code.ts"
import { servedInGroup } from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.code.ts"
import {
  ACTIVITY_GROUPS,
  type ActivityGroup,
  contentOf,
  readingSaid,
  type StoplightsContent,
} from "akasha/alan/harness/stoplight/modules/stoplights-activity-content/stoplights-activity-content.module.code.ts"
import { LIVE_ACTIVITY } from "akasha/person/modules/device-token-registration/device-token-registration.module.code.ts"

const ACTIVITY_LOG = "stoplights-activity:"

export interface ActivityPushState {
  pushed: string | null
}

const NO_NAME = ""

async function groupNow(groupSlug: string): Promise<ActivityGroup> {
  const served = await servedInGroup(groupSlug, undefined, onTheWorkstation)
  return { rows: served.stoplights, wireKeyName: served.wireKeyName ?? NO_NAME }
}

async function contentNow(takenAt: string): Promise<StoplightsContent> {
  const [upkeep, inboxes, attributes] = ACTIVITY_GROUPS
  const groups = await Promise.all([groupNow(upkeep), groupNow(inboxes), groupNow(attributes)])
  return contentOf(groups, takenAt)
}

function stoplightsIn(content: StoplightsContent): number {
  return content.upkeep.length + content.inboxes.length + content.attributes.length
}

export function activityPayload(content: StoplightsContent, atSeconds: number): ApnsPayload {
  return {
    aps: {
      timestamp: atSeconds,
      event: "update",
      "content-state": content,
    },
  }
}

export async function pushStoplightsActivity(
  args: {
    readonly sender: ApnsSender
    readonly userId: string
    readonly state: ActivityPushState
    readonly signal: AbortSignal
  },
  done: string[] = []
): Promise<void> {
  const tokens = await listActivityTokens(args.userId)
  if (tokens.length === 0) return

  const content = await contentNow(new Date().toISOString())
  const said = readingSaid(content)
  if (said === args.state.pushed) return

  const payload = activityPayload(content, Math.floor(Date.now() / 1000))
  let reached = false
  for (const token of tokens) {
    args.signal.throwIfAborted()
    try {
      const answer = await args.sender.send(
        token.deviceToken,
        payload,
        liveActivityTopic(token.bundleId),
        LIVE_ACTIVITY
      )
      if (answer.kind === "prune") {
        await pruneDeviceToken(token.deviceToken)
        console.log(
          `${ACTIVITY_LOG} dropped an activity token Apple no longer reaches (${answer.status} ${answer.reason})`
        )
      } else if (answer.kind === "error") {
        console.error(
          `${ACTIVITY_LOG} ${token.bundleId} refused the reading (${answer.status})`,
          answer.reason
        )
      } else {
        reached = true
        done.push(
          `a reading of ${stoplightsIn(content)} stoplights, drawn on a lock screen on ${token.bundleId}`
        )
        console.log(`${ACTIVITY_LOG} pushed a reading to ${token.bundleId}`)
      }
    } catch (err) {
      console.error(`${ACTIVITY_LOG} the send to ${token.bundleId} threw:`, err)
    }
  }
  if (reached) args.state.pushed = said
}
