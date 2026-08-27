---
id: d2f32f6b-6f63-579d-9e55-30bcb2918254
page-type-slug: finding
title: "Unguarded config key blanks properties"
domain-slug: domain/pages-system
---

# Claim

A typo in a page-type's `sequence` or `mediaConfig` blob silently blanks that page-type's entire
`propertyDefinitions` for every consumer reading through `parsePageTypeData`. Two of the four config
keys on the same object are guarded against this and two are not, the reason recorded beside the
guarded two points the wrong way for the next key added, and nothing detects it.

# Evidence

Read and RUN 2026-08-07 against `~/code` at `origin/main` `383bf60d35`.

`pageTypeDataSchema` (`packages/shared/pages/core/src/schema/pages.ts:292-313`) holds
`propertyDefinitions` and four optional config keys. `listingConfig` (`:303`) and `detailConfig`
(`:308`) are `.optional().catch(undefined)`. `sequence` (`:297`) and `mediaConfig` (`:311`) are
`.optional()` alone, and both sub-schemas are `.strict()` — `sequence-config.ts:29` and
`media-config.ts:65` — so an unknown key under either is a parse failure. `parsePageTypeData`
(`:322-325`) swallows it and returns `{ propertyDefinitions: [] }`.

Executed against seven blobs, each carrying two real property definitions. No config keys, a
malformed `listingConfig`, a malformed `detailConfig` and a valid `sequence` each returned 2. One
unknown key under `sequence` returned 0. A malformed `sequence` returned 0. One unknown key under
`mediaConfig` returned 0.

The reach is the fourteen non-test `parsePageTypeData` call sites: eleven points-computation
resolvers and scripts across `daily-tracking`, `personas`, `fun-points` and `persona-reward-watcher`,
plus `page-detail-content.tsx:102` and `app-capacitor/routes/page-detail.tsx:114`. The access layer
is unaffected — `pages/access/src/page-type-config.ts` reads `attrs.propertyDefinitions` off the raw
row and parses each blob through its own tolerant parser.

`pages.ts:305-307` records the guard's reason as "presentation metadata must never lose the
page-type's propertyDefinitions" — which reads as not applying to a key that is not presentation
metadata, and `sequence` is a read-ordering declaration.

Nothing catches it. `packages/infra/checks/src/checks/` carries one page-type check,
`check-page-type-slug-validity.ts`, about slugs. Nothing validates a blob at write time or scans
landed rows. The one writer, `infra/inference/src/setup-image-page-type-lib.ts:212`, writes constants.
