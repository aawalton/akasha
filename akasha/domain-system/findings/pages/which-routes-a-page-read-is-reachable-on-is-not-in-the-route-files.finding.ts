import type { Finding } from "../finding.page-type.ts"

export const whichRoutesAPageReadIsReachableOnIsNotInTheRouteFiles = {
  id: "01a062c4-2bdf-754e-875b-c0d8394de9e3",
  pageTypeSlug: "finding",
  slug: "which-routes-a-page-read-is-reachable-on-is-not-in-the-route-files",
  domainSlug: "domain/akasha-migration",
  claim:
    "Which routes of Alan's site a page read is reachable on cannot be read off the route files. `page-listing.tsx` and `page-detail-loader.server.ts` check no user and read pages, yet answer 302 without a session. The gate is `authGuard(request, AUTH_CONFIG)` in `root.tsx`, a root loader redirecting any path outside `internalApiPaths`. A page route runs it; a resource route, which exports a loader and no component, does not and gates itself or not at all.",
  evidence:
    "Measured 2026-09-02 against `https://alanwalton.com` with no session, while every page read on the site threw.\n\n`/readout`, `/persona`, `/finding`, `/module` and `/book` each answered 302, as did `/readout/deadbeef` and `/persona/deadbeef` — though `page-listing.tsx`'s loader calls `getPageTypeByPluralSlug` before anything else and checks no user, and `page-detail-loader.server.ts` awaits `resolveRequestSession(request)` and discards what it returns. `api/nav-icon/deadbeef` and `api/media/deadbeef/variants` answered 500. `api/pages/readout` answered 401, from its own `getUser`.\n\nThe discriminator is `export default`: `api.nav-icon.$idSuffix.ts` and `api.media.$pageId.variants.ts` carry none, `page-listing.tsx` carries one. React Router runs parent loaders for a page route and not for a resource route, so `root.tsx:93` gates the first and never runs for the second.\n\nA subagent reading the route bodies reported five files reading pages before auth, the two page routes among them. Three production readings refute it. The bodies were read correctly; the conclusion did not survive, because the gate is not in them.\n\nWhat follows: an unauthenticated probe of this site sees only resource routes that do not gate themselves. Two answer 500 today, and both are confounded — `nav` is no page type akasha holds, and nothing declares `mediaConfig` — so neither reports cleanly on whether a page can be read. `/^\\/api\\/media\\//` stands in `internalApiPaths`, so that one is not gated even nominally.",
} as const satisfies Finding
