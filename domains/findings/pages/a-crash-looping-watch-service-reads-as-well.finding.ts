import type { Finding } from "../finding.page-type.types.ts"

export const aCrashLoopingWatchServiceReadsAsWell = {
  id: "01a08c17-7cf9-77b1-a8f1-3e8340b26b38",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-crash-looping-watch-service-reads-as-well",
  domain: "page-type/workstation-service",
  claim:
    "A watch service that dies and restarts forever is never called broken. `service-health` counts `activating` among the states that are well and calls a unit broken only where systemd says `failed`, while every watch unit states restart on failure, a five second delay, and no window over which starts are counted. So systemd never gives up and never rests in `failed`, and a watch dying every five seconds spends most of each cycle in `activating`. This matters more as the readouts move from timers to watches, because a reading judged current by whether its watch is well would then rest on a signal a crash loop passes.",
  evidence:
    "`services/workstation-services/service-health/service-health.module.code.ts:9` holds the well states as `active`, `activating` and `reloading`. Line 58 is the only way a running unit reads as broken, and it asks whether the active state is `failed`. The module page states it plainly: a service still coming up is well rather than broken.\n\nAll three watch services carry the config that keeps a failure from settling. `inbox-count-watch-service` states restart on failure, `restartDelaySeconds` 5 and `startLimitIntervalSeconds` 0, with the invariants that repeated starts are counted over no window and that a watch failing all night keeps on. `temper-watcher` states the same. `day-readout-watch-service` was modelled on the first.\n\nsystemd holds a unit through its restart delay as activating rather than failed. With no interval over which starts are counted there is no state in which systemd stops trying, so `failed` is passed through rather than rested in.\n\n`service-watching` runs on `*:*:00` with five seconds of jitter, so it samples about once a minute against a five second cycle.\n\nThe restart count is the property that would tell a healthy unit from a looping one, since a unit restarting once is not a unit whose count climbs at every sample. Nothing here reads it.\n\nNot verified: this rests on reading the health mapping and the three unit pages. No crash-looping unit was run and no comparison was made between what systemd reported and what `service-health` said of it.",
} as const satisfies Finding
