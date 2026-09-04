import { buildPageHref } from "@akasha/pages-url/page-href"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { SMILINGJENNY_PUSH_APP } from "@akasha/person-system/push-apps"
import {
  type Feed,
  NOTIFICATION_FEED_PAGE_TYPE_SLUG,
} from "../../notification-feeds/notification-feed-rows/notification-feed-rows.module.code.ts"
import type { ApnsPayload } from "../apns-sending/apns-sending.module.code.ts"

export const SURPLUS_FALL_KIND = "surplus-fall"

export const DEEP_LINK_PATH_KEY = "path"

export function notificationFeedRoute(feed: Feed): string {
  return buildPageHref({
    pageTypeSlug: toPageTypeSlug(NOTIFICATION_FEED_PAGE_TYPE_SLUG),
    slug: feed.slug,
    fallbackSlugSource: null,
    id: feed.id,
  })
}

export function buildApnsPayload(content: {
  readonly title: string
  readonly body: string
  readonly route: string
}): ApnsPayload {
  return {
    aps: { alert: { title: content.title, body: content.body }, sound: "default" },
    [DEEP_LINK_PATH_KEY]: content.route,
  }
}

export function buildSharedApnsPayload(content: {
  readonly title: string
  readonly body: string
}): ApnsPayload {
  return { aps: { alert: { title: content.title, body: content.body }, sound: "default" } }
}

export interface Recipient {
  readonly userId: string
  readonly ownsNotification: boolean
}

export function recipientsFor(args: {
  readonly ownerUserId: string
  readonly kind: string | null
}): readonly Recipient[] {
  const owner: Recipient = { userId: args.ownerUserId, ownsNotification: true }
  if (args.kind !== SURPLUS_FALL_KIND) return [owner]
  if (SMILINGJENNY_PUSH_APP.userId === args.ownerUserId) return [owner]
  return [owner, { userId: SMILINGJENNY_PUSH_APP.userId, ownsNotification: false }]
}
