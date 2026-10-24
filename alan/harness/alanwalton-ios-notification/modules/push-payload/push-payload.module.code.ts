import type { ApnsPayload } from "akasha/alan/harness/alanwalton-ios-notification/modules/apns-sending/apns-sending.module.code.ts"
import {
  type Feed,
  NOTIFICATION_FEED_PAGE_TYPE_SLUG,
} from "akasha/alan/harness/notification-feed/modules/rows/notification-feed-rows.module.code.ts"
import { buildPageHref } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import {
  pushAppOf,
  SMILINGJENNY_PUSH_APP,
} from "akasha/person/modules/push-apps/push-apps.module.code.ts"

const SURPLUS_FALL_KIND = "surplus-fall"

const DEEP_LINK_PATH_KEY = "path"

function notificationFeedRoute(feed: Feed): string {
  return buildPageHref({
    pageTypeSlug: toPageTypeSlug(NOTIFICATION_FEED_PAGE_TYPE_SLUG),
    slug: feed.slug,
    fallbackSlugSource: null,
    id: feed.id,
  })
}

export function notificationRoute(link: string | null, feed: Feed): string {
  return link === null || link === "" ? notificationFeedRoute(feed) : link
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

function buildUnroutedApnsPayload(content: {
  readonly title: string
  readonly body: string
}): ApnsPayload {
  return { aps: { alert: { title: content.title, body: content.body }, sound: "default" } }
}

export interface Recipient {
  readonly userId: string
  readonly bundleId: string
  readonly routesTaps: boolean
}

export function apnsPayloadFor(
  recipient: Recipient,
  content: { readonly title: string; readonly body: string; readonly route: string }
): ApnsPayload {
  return recipient.routesTaps ? buildApnsPayload(content) : buildUnroutedApnsPayload(content)
}

export function recipientsFor(args: {
  readonly ownerUserId: string
  readonly kind: string | null
}): readonly Recipient[] {
  const userIds = new Set([args.ownerUserId])
  if (args.kind === SURPLUS_FALL_KIND) userIds.add(SMILINGJENNY_PUSH_APP.userId)
  const found: Recipient[] = []
  for (const userId of userIds) {
    const app = pushAppOf(userId)
    if (app !== null) found.push({ userId, bundleId: app.bundleId, routesTaps: app.routesTaps })
  }
  return found
}
