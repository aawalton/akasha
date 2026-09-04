import type { Finding } from "../finding.page-type.ts"

export const akashaPackagesSitOutsideEveryProjectReference = {
  id: "01a05d4f-1b20-7000-9c3e-4f1a2b6d8e70",
  pageTypeSlug: "finding",
  slug: "akasha-packages-sit-outside-every-project-reference",
  domainSlug: "domain/akasha-migration",
  claim:
    "Revived, `check-tsconfig` reports 256 missing tsconfig references, and 232 of them name a package under `akasha/`. 237 of the 256 targets carry no `tsconfig.json` at all, so the reference they are missing cannot be written: 90 of the tree's 287 workspaces have no tsconfig, nearly all of them akasha packages. This is the same condition that hid the fourteen dead cluster checks — a package outside every reference closure is read by no compiler.",
  evidence:
    "Run at HEAD's tree, `check-tsconfig` examines 197 workspace tsconfigs and reports 285 violations: 256 `missingReference`, 14 `excludeShape`, 10 `spuriousReference`, 3 `sourceLayout`, 2 `allowImportingTsExtensions`.\n\nOf the 256 `missingReference` violations, 232 name a target under `akasha/`, and 237 of the 256 targets hold no `tsconfig.json`. The heaviest targets are `akasha/utils-narrow` (46), `akasha/errors-core` (13), `akasha/pages-system/pages-access` (12), `akasha/design/design-patterns` (11), `akasha/design/design-primitives` (10), `shared/pages-query` (10), `akasha/design/design-layout` (9), `akasha/supabase-database` (8). The heaviest importers are `alanwalton/web` (37), `temper/web` (23), `alanwalton/atlas-web` (20), `shared/pages-ui` (18), `archive-of-worlds/web` (15), `smilingjenny/web` (14).\n\nThe root manifest declares 287 workspaces and 197 of them carry a `tsconfig.json`, so 90 do not. The root `tsconfig.json` closure covers 126 projects with 0 errors, and it reaches none of these.\n\nThe check was dead from `8688ef3db5` until `200205a720`, so no run has said any of this since 2026-08-27.",
} as const satisfies Finding
