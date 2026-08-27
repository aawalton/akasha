---
id: 6669bed0-167b-55ce-90fd-4229bbd75a85
page-type-slug: finding
title: "Capacitor detail resolution narrower"
domain-slug: domain/alanwalton-app
---

# Claim

The Capacitor shell resolves a page detail URL against the URL's page-type slug alone, where the web
loader falls back to the slug's inheritance subtree. An abstract-parent URL that resolves on the live
site 404s on Alan's device. `check-app-capacitor-parity` reads green on it.

# Evidence

Read 2026-08-07 against `~/code` at `origin/main` `383bf60d35`.

Both trees declare the same route: `app/routes.ts:27` and `app-capacitor/routes.ts:27` each carry
`route(":pageTypeSlug/:pageHrefParam", "routes/page-detail.tsx")`.

The web loader (`app/routes/page-detail-loader.server.ts:97-124`) reads `getPageByIdSuffix` scoped to
the URL's slug, and on a miss calls `getDescendantPageTypeSlugs(supabase, brandedSlug)` and re-reads
with `getPageByIdSuffixAcrossTypes` across the subtree, so `/story/{slug}-{last8}` resolves a page of
any concrete type descending from the abstract `story`. `atlas/web` and `archive-of-worlds` do the
same.

The shell (`app-capacitor/routes/page-detail.tsx:99-107`) calls
`usePageByIdSuffix({ pageTypeSlug: slug, idSuffix, slug })` and stops. It imports no subtree helper.
No miss path widens the read.

`check-app-capacitor-parity` does not see it. Its four role-pairs
(`packages/infra/checks/src/lib/app-capacitor-parity.ts:45-69`) are `root.tsx`, `_app-layout.tsx`,
`routes.ts` and `page-detail.tsx`. The `routes` axis extracts route path *strings* from `route(…)`
calls, and both trees declare the identical string, so it passes. The `render-targets` axis extracts
JSX *tag identifiers*. The diverging code is loader behaviour in
`page-detail-loader.server.ts`, which is not one of the four pairs at all.

The gate's header claims the class it misses here: "a silent strip (a dropped provider, route, or
render branch) shipped straight to Alan's device three times … This gate turns that class into a
check."

The shell's own comments assert parity on three neighbouring axes — "mirroring web's server-side
`getDetailConfig`" (`:109-110`), "this hook mirrors web's `resolveReaderNeighbors`" (`:117-118`),
"mirroring web's page-detail.tsx question branch" (`:307`) — which is what makes the fourth read as
covered.
