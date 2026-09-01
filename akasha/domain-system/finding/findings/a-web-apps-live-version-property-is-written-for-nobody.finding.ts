import type { Finding } from "../finding.page-type.ts"

export const aWebAppsLiveVersionPropertyIsWrittenForNobody = {
  id: "01a05ac5-35e4-7a97-b24a-3ba38c12d9e4",
  pageTypeSlug: "finding",
  slug: "a-web-apps-live-version-property-is-written-for-nobody",
  domainSlug: "workspace-package/service-system",
  claim:
    "The `live-version` and `deployed-at` properties on a web app page have no reader left. They were written by the deploy command and read back by `/api/live-version`, which now answers out of the running build instead. Whether the properties are kept as a record of when a deploy last ran, or go with the writer that can no longer run, is undecided.",
  evidence:
    "`deploy-system/live-version/live-version.ts:51` writes `live-version` and `deployed-at` onto every `*.web-app.md` page naming the deployed service, through `patchState` from the deleted `@shared/pages-query`, so the write cannot happen. The only reader was `liveVersionLoader(WEB_APP_SLUG)` in each site's `app/routes/api.live-version.ts`, through the same deleted package. In db2825ac44 that route was changed to answer with `NEXT_PUBLIC_BUILD_SHA` — the sha `ops deploy` already bakes into the build at `deploy-system/build/build.ts:185` — so the site states its own commit and asks nobody. The page property definition still stands at `pages/page-property-definition/web-app-live-version.page-property-definition.md`. I left the writer and the property alone rather than deleting them, because the page query work they sit on is being rebuilt right now by other hands: `pages-system/query/` gained `query.ts`, `keys.ts`, `order.ts`, `reduce.ts` and `expands.ts` in commits landed today (46f402e7b4, 15615b0568, cbe6e2257a, 580d2a4022). Deleting a property out from under that would be guessing at where it lands.",
} as const satisfies Finding
