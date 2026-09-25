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
import { stoplightsActivityPushing } from "akasha/alan/harness/alanwalton-ios-notification/modules/stoplights-activity-pushing/stoplights-activity-pushing.module.ts"
import {
  groupsServedBy,
  servedInGroup,
} from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.code.ts"
import {
  type ActivityGroup,
  contentOf,
  readingSaid,
  type StoplightsContent,
  stoplightsCounted,
} from "akasha/alan/harness/stoplight/modules/stoplights-activity-content/stoplights-activity-content.module.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import type { Fetcher } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { LIVE_ACTIVITY } from "akasha/person/modules/device-token-registration/device-token-registration.module.code.ts"

const ACTIVITY_LOG = "stoplights-activity:"

export interface ActivityPushState {
  pushed: string | null
}

const NO_NAME = ""

const SERVED_BY = namedAs(module.slug, stoplightsActivityPushing.slug, null)

async function groupNow(slug: string, fetcher?: Fetcher): Promise<ActivityGroup> {
  const served = await servedInGroup(slug, undefined, fetcher)
  return { slug, rows: served.stoplights, wireKeyName: served.wireKeyName ?? NO_NAME }
}

export async function contentServedBy(
  servedBy: string,
  takenAt: string,
  fetcher?: Fetcher
): Promise<StoplightsContent> {
  const slugs = await groupsServedBy(servedBy, fetcher)
  return contentOf(await Promise.all(slugs.map((slug) => groupNow(slug, fetcher))), takenAt)
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

  const content = await contentServedBy(SERVED_BY, new Date().toISOString(), onTheWorkstation)
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
          `a reading of ${stoplightsCounted(content)} stoplights, drawn on a lock screen on ${token.bundleId}`
        )
        console.log(`${ACTIVITY_LOG} pushed a reading to ${token.bundleId}`)
      }
    } catch (err) {
      console.error(`${ACTIVITY_LOG} the send to ${token.bundleId} threw:`, err)
    }
  }
  if (reached) args.state.pushed = said
}
