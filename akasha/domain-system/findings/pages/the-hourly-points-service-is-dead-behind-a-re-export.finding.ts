import type { Finding } from "../finding.page-type.ts"

export const theHourlyPointsServiceIsDeadBehindAReExport = {
  id: "01a05f27-d0d0-706e-a339-e5c6f88a5f57",
  pageTypeSlug: "finding",
  slug: "the-hourly-points-service-is-dead-behind-a-re-export",
  domainSlug: "domain/alan-harness",
  claim:
    "`daily-tracking-points` is enabled and runs hourly, and it has answered nothing since the saved queries began refusing. It reaches them through a re-export in `tracking-modules.ts`, so no search for `@shared/pages-query` names any of the six files behind it. The points it computes describe Alan's life, so nothing here was stubbed and nothing was made to answer a number in place of the absence.",
  evidence:
    "`tools/lib/wake-day/tracking-modules.ts` re-exports `askNamed` and `patchPage` from `@shared/pages-query`. Six files take them from there rather than from the package: `persona-recipe-rows.ts` with two asks, `reading-sources.ts`, `write-daily-points.ts`, `value-points.ts`, `daily-row.ts` and `persona-total-landing.ts`. Seven call sites in all, and every one of them refuses.\n\n`persona-recipe-rows.ts` sits at the root of the points engine, so the service fails at its first read and could not write its results either. Both halves are gone rather than one.\n\nThe re-export is why this went unseen. Four lanes searched the tree for the package name and none of these six files carries it.\n\nOne half of the tier does work and is the shape the rest could take. `landedOnPersona` in `persona-total-landing.ts` writes through `readFiles` and `writeFiles`, which the store still answers; only the `patchPage` fallback at line 107 is dead. So the road out is not the new service for every caller — it is the file verbs for whoever writes whole files.\n\nThe call taken in the meantime: leave the service as it is rather than stub seven sites. A stub here would answer a number where a reading is absent, and a points total that reads zero because nothing could be asked is a false statement about Alan's day rather than the gap it is. Whether the tier moves onto the file verbs or onto `@akasha/pages-system-service` is one decision about one subsystem, not seven.",
} as const satisfies Finding
