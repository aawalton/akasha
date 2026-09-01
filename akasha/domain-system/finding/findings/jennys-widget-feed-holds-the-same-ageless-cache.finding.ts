import type { Finding } from "../finding.page-type.ts"

export const jennysWidgetFeedHoldsTheSameAgelessCache = {
  id: "01a05b92-9071-7000-928f-f4d2e52a156a",
  pageTypeSlug: "finding",
  slug: "jennys-widget-feed-holds-the-same-ageless-cache",
  domainSlug: "ios-component/smilingjenny-widget-feed",
  claim:
    "Alan's feed now lets a cached reading go once it is older than forty-five minutes, and Jenny's still holds one for ever. The two files declare separate copies of `LastKnownStore` whose bodies were character-identical until tonight, so the defect filed against Alan's tile stands untouched on Jenny's. The call taken in Alan's absence was to leave it, because every intent on his side comes before hers and her feed is not the file his tile draws from.",
  evidence:
    "`smilingjenny-widget-feed.ios-component.swift.swift:35-47` declares `LastKnownStore` with the same `\"last-known\" + endpoint.path` key, the same `UserDefaults.standard`, and no moment written beside the body. `alanwalton-widget-feed.ios-component.swift.swift:22-34` held the same twelve lines before b38030764b gave them an age.\n\nThe two feed files are near-duplicates: `FeedState`, `FeedEntry`, `WidgetFeed`, `FetchOutcome`, `FeedResolution` and `FeedProvider` all stand twice. They part only over the credential, Alan's reading a device secret and Jenny's carrying a baked-in ring credential, and over `FetchOutcome.forStatus`, which Jenny factors out and Alan inlines.\n\nHer route is a twin of Alan's rather than a proxy of it: `smilingjenny/web/app/routes/api.categorization.ts:24-28` reads the same relay through `relayedHeld` and refuses past the same `STALE_AFTER_MS`, answering the same 503 at :35-40, gated on `SMILINGJENNY_RING_CREDENTIAL` at :16-22 rather than on a device secret. So the same 503 reaches her tile, and hers falls back to a body of unbounded age. It reads the same scale at :43, so the rung that moved off zero already reaches her.\n\nNeither program compiles the other's feed, so the two copies never collide and the fix does not carry across by itself.",
} as const satisfies Finding
