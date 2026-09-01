import type { Finding } from "../finding.page-type.ts"

export const alansUsageWidgetDrawsUnreadAndTheReadingsCannotReachIt = {
  id: "01a05cb3-224b-7000-8a12-1cbb9886db18",
  pageTypeSlug: "finding",
  slug: "alans-usage-widget-draws-unread-and-the-readings-cannot-reach-it",
  domainSlug: "domain/alan-harness",
  claim:
    "Alan's usage widget draws `—` now rather than a fleet at zero percent spent, because `api.claude-usage.ts` refuses where its mean over the fleet is a mean over no account. Real numbers still cannot reach it. The pod does hold a checkout, but every figure the widget wants stands in a file git ignores, so the clone carries the eight account pages and none of the eight readings.",
  evidence:
    "Measured 2026-09-01 by running rather than reading. `buildClaudeUsageResponse` over the four answers the deployed loader takes gave 200 with `avgUsedPct: 0` and `tier: blue` before `00034c37b1` and 503 after. `claude-accounts-mean-weekly-used` answers `n: 8, over: 0, value: null`: it matches every account the store holds and reduces over `effective-seven-day-percent-used`, deleted at `54ee772b64`. The three instant queries answer `n: 0` and are left reading as a true empty, since no account having a window running is as good a reason for it.\n\nBoth sides were already built for absence. `FeedProvider` in `alanwalton-widget-feed` reads anything but 200 as unreachable, falls back to a reading held 45 minutes, then answers `neverLoaded`, which `ClaudeUsageHomeView` draws as `—` on a grey ring.\n\nThat no checkout stands in the pod is wrong. `alanwalton-web.cluster-service.code.attachment.ts:78` sets `AKASHA_ROOT` to the orchestrator cache repo path. It buys nothing: `readingsIn` takes every figure from the file beside each page, `.gitignore` line 2 excludes that name, 0 of 8 are tracked, and 8 stand on this workstation where `readFleetUsage()` answers `over: 8`.\n\nWhat is left is carrying the readings rather than checking them out. `readout-relay` does that for Monarch, but carries one non-negative integer under one readout name and holds it in memory, so four readouts and a workstation timer are wanted. `readouts/readout/weekly-usage.readout.md` and its three siblings already stand.\n\nThe call I took: no deploy. 861 commits stand between the live build and HEAD and `akasha deploy` builds HEAD.",
} as const satisfies Finding
