import type { Finding } from "../finding.page-type.ts"

export const theWatcherUnitsLoseFiveSystemdOptions = {
  id: "01a0603e-0c89-7e55-9172-270ee81ed9ad",
  pageTypeSlug: "finding",
  slug: "the-watcher-units-lose-five-systemd-options",
  domainSlug: "workspace-package/service-system",
  claim:
    "The `systemd` record a workstation service carries holds six options, and the two temper watcher units were written against eleven. Five have no key to be written under, and the two that matter most are what keeps the watcher trying: exit 75 is how the worker asks to be started again, and the restart counter runs over no window so a watcher failing all night is still trying in the morning.",
  evidence:
    "`akasha/service-system/workstation-service/properties/systemd.record-property.ts` carries `restart`, `restart-delay-seconds`, `start-timeout-seconds`, `schedule`, `jitter-seconds` and `catch-up`, and already says as a stopgap that six of the seventeen options the services state are carried there.\n\n`pages/workstation-service/temper-watcher.workstation-service.md` states `restart: on-failure`, `restart-delay-seconds: 5`, and three more with no home: `success-exit-status: 75`, `restart-force-exit-status: 75`, `start-limit-interval-seconds: 0`. Its own design section says exit 75 is how the worker asks to be recycled and is counted as a clean stop, and that repeated starts are counted over no window at all because a watcher that fails all night must still be trying in the morning. Both of those are gone from the akasha page.\n\n`pages/workstation-service/temper-watcher-liveness.workstation-service.md` states `interval-seconds: 60`, `catch-up: true` and `boot-delay-seconds: 90`. The interval was rewritten as the schedule `*:*:00`, which starts the tick every minute. `catch-up` carried over. `boot-delay-seconds` has no home, so the liveness tick now runs at the first minute after boot rather than ninety seconds in, and may page while the watcher is still coming up.\n\nThe akasha pages are `akasha/temper/temper-watcher/workstation-services/temper-watcher.workstation-service.ts` and `akasha/temper/temper-watcher/workstation-services/temper-watcher-liveness.workstation-service.ts`. Neither states anything it could not state, so the loss is in the record property rather than in the pages.",
} as const satisfies Finding
