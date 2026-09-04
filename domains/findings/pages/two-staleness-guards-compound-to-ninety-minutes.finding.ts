import type { Finding } from "../finding.page-type.ts"

export const twoStalenessGuardsCompoundToNinetyMinutes = {
  id: "01a05b92-9071-7001-8686-5b7af6823de7",
  pageTypeSlug: "finding",
  slug: "two-staleness-guards-compound-to-ninety-minutes",
  domainSlug: "ios-component/alanwalton-widget-feed",
  claim:
    "The route bounds a reading at forty-five minutes old and the widget now bounds its cache at forty-five minutes since it was fetched, and the two bounds add rather than overlap. A reading forty-four minutes old fetched and then held for forty-four more is eighty-eight minutes old and still drawn as a number. The widget cannot do better, because it is told when it fetched and never when the reading was taken.",
  evidence:
    "`readout-categorization.module.code.ts:24-28` refuses a reading once `readingAged(held, now) >= STALE_AFTER_MS`, forty-five minutes at `akasha/readout-system/readout-reading/readout-reading.module.code.ts:7`. What it then serves carries no moment: the body is `{unreviewed, scale?, noneLeftWords?, noneLeftEmoji?}` at `monarch-unreviewed-transactions.readout.code.ts:10-15`.\n\n`alanwalton-widget-feed.ios-component.swift.swift:23` holds a cached body for `HELD_FOR`, forty-five minutes, measured from the moment the widget wrote it, which is the moment it got a 200 rather than the moment the reading was taken.\n\nSo the age drawn is bounded at the sum, ninety minutes, rather than at forty-five.\n\nTightening it wants the reading's age on the wire. That is a key added to the body, which `tools/lib/check-workflow/widget-payload-shape-mirror.ts:26-44` holds against `RingCounts` and `RingScale` key for key, so both sides move together. It also wants a deploy: the pod serving the route is well behind HEAD. Neither was in reach tonight.",
} as const satisfies Finding
