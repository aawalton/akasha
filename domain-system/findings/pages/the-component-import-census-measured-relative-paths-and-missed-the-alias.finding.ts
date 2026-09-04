import type { Finding } from "../finding.page-type.ts"

export const theComponentImportCensusMeasuredRelativePathsAndMissedTheAlias = {
  id: "01a06426-cc4a-7171-8f59-d446c157541f",
  pageTypeSlug: "finding",
  slug: "the-component-import-census-measured-relative-paths-and-missed-the-alias",
  domainSlug: "router-app/temper-web",
  claim:
    "The import census over temper's 271 component files measured `./`, `../` and `~/`, reported 35 relative imports with none using `~/`, and concluded that most files need no repointing. It never measured `@/`, the alias temper's own tsconfig maps onto the app tree and the ordinary way one component reaches another. In the companion family alone 118 `@/` lines are spread over 45 of its 80 files, so 53 of 78 modules needed repointing rather than the handful the census implied.",
  evidence:
    "Measured 2026-09-02 while carrying `companions`, `companion-skills`, `companion-equipment` and `companion-character` into `akasha/temper/temper-web`.\n\n`temper/web/tsconfig.json` lines 4-31 declare the mappings, in this order: `@/components/*` to `./app/components/*`, `@/hooks/*` to `./app/hooks/*`, `@/lib/*` to `./app/lib/*`, `@/app/*` to `./app/bridge/app/*`, `@/*` to `./*`, and `~/*` to `./app/*`. The `~/` alias is real but unused; `@/components/` carries the traffic.\n\nCounted over the four folders, `grep -rc 'from \\\"@/'` returns 118 lines across 45 files, against 21 `./` lines across 12 files. The alias outnumbers what the census measured by more than five to one, in the very family the census was used to plan.\n\nThe census numbers were not wrong. `@akasha/temper-companions-core` really is imported 216 times and really is landed. The error is that a true count of one kind of specifier was read as a count of every kind, and the conclusion reached -- that most files move untouched -- was false for 53 of 78 modules here. A seat trusting it would have written the byte-faithful move and landed 45 files whose imports resolve to nothing.\n\nThe instrument and its subject differed. The census asked which imports are relative; the plan needed to know which imports must be rewritten. `@/` is not relative and must still be rewritten, because nothing under `akasha/` defines that alias.",
} as const satisfies Finding
