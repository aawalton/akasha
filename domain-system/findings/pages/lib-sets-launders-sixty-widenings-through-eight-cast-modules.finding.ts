import type { Finding } from "../finding.page-type.ts"

export const libSetsLaundersSixtyWideningsThroughEightCastModules = {
  id: "01a0619a-df4b-74f4-8dfd-23a9a2002349",
  pageTypeSlug: "finding",
  slug: "lib-sets-launders-sixty-widenings-through-eight-cast-modules",
  domainSlug: "domain/temper",
  claim:
    "LibSets carries eight modules whose whole content is helpers of the shape `asX(value: unknown): X { return value as X }`, about sixty of them, reached by more than eighty-six of its files. Each one is a widening the compiler is given no evidence for, wearing a function's clothes. They were carried across faithfully rather than inlined, because inlining them is a typing run on the whole library rather than part of a migration.",
  evidence:
    "Measured 2026-09-02. The eight modules are src/casts.ts, src/core/casts.ts, src/core/casts-tables.ts, src/data/casts.ts, src/constants/casts.ts, src/searchui/casts.ts, src/tooltips/casts.ts, src/debug/casts.ts and src/autocomplete/casts.ts. src/casts.ts alone is imported by 86 of the package's 160 modules.\n\nA single `value as X` is legal TypeScript and no-double-cast does not refuse it, so nothing in akasha catches these. The defect is what the helper hides rather than what it writes. An earlier run over the temper-lib-* packages inlined fourteen such helpers and found nine genuine unsound widenings underneath, which TypeScript then refused as neither type sufficiently overlapping, and two that were never needed.\n\nThe akasha copies are byte-identical to the source modulo the recorded renames, so the count is unchanged by the migration. Inlining them belongs in a run of its own, and that run should expect to find real defects rather than duplication to merge.",
} as const satisfies Finding
