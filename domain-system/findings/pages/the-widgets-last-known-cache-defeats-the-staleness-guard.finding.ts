import type { Finding } from "../finding.page-type.ts"

export const theWidgetsLastKnownCacheDefeatsTheStalenessGuard = {
  id: "01a05b7e-984e-7e12-96b8-73d2d9a3127f",
  pageTypeSlug: "finding",
  slug: "the-widgets-last-known-cache-defeats-the-staleness-guard",
  domainSlug: "ios-component/alanwalton-widget-feed",
  claim:
    "The route refuses a reading older than 45 minutes so that no stale count is shown, and the widget then shows a stale count anyway. A 503 saying there is no fresh reading is read as `.unreachable`, which falls back to `LastKnownStore`, whose entry has no age and is never expired. So the tile draws a number of unbounded age in the same type as a live one, with nothing to tell Alan which he is looking at. The server's staleness guard changes nothing a reader can see.",
  evidence:
    '`api.categorization.ts:14-18` returns null once `readingAged(held, now) >= STALE_AFTER_MS`, and `STALE_AFTER_MS` is 45 minutes at `shared/monarch-categorization-access/src/ring-reading.ts:5`. Lines 25-30 turn that into a 503 whose body is `{ok:false,error:"No reading."}`.\n\nIn `alanwalton-widget-feed.ios-component.swift.swift:122-124`, only 401 becomes `.refused`; every other non-200, the 503 included, becomes `.unreachable`. `FeedResolution.resolve` at :59-61 sends `.unreachable` to `fromCache`, and `fromCache` at :64-71 returns `.loaded(payload)` for any cached body that decodes. `LastKnownStore` at :22-34 keeps only the raw body under a UserDefaults key and stores no moment, so nothing can judge its age.\n\n`CategorizeHomeView` at `alanwalton-categorize-widget.ios-component.swift.swift:13-22` branches only on `.refused`; `.loaded` from cache and `.loaded` from the network render identically. `NeverLoadedView` is reached only when there is no cache at all.\n\nRun locally against the shipped modules: a reading 381 minutes old gives null, 46 minutes gives null, 44 minutes gives its value. That refusal is the one the widget discards.\n\nThis is live now rather than hypothetical: `monarch-reading-service` has been failing on a dead `MONARCH_COOKIE`, so the newest reading anywhere is already older than the window.',
} as const satisfies Finding
