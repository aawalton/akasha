import type { Finding } from "../finding.page-type.ts"

export const aRenamingTypeAliasIsNoGapInATwinBecauseRestoringItIsRefused = {
  id: "01a06310-5336-7a45-9965-f11da09cb668",
  pageTypeSlug: "finding",
  slug: "a-renaming-type-alias-is-no-gap-in-a-twin-because-restoring-it-is-refused",
  domainSlug: "domain/temper",
  claim:
    "The aliases `SetsAll`, `SetsAllId` and `SetsAllTemplate` that the old `sets-all-data.ts` exported are no gap in the akasha twin. Each renames a type the file imports, and `no-re-export` judges a name imported and then exported the same as one exported from its source, holds that a new spelling on the way out hides nothing, and counts a type-only re-export as a re-export. It runs on patch, so restoring them is refused rather than merely discouraged.",
  evidence:
    '`temper/game-characters-equipment/src/sets/sets-all-data.ts` states `SetsAllId = SetId` at line 9, `SetsAllTemplate = SetTemplate` at line 11 and `SetsAll = SetTemplate` at line 13, beside a literal `export type { EquipmentPattern } from "@akasha/temper-equipment/set-patterns"` at line 7. The twin `akasha/temper/temper-characters-equipment/sets-all/sets-all.module.code.ts` imports `SetId`, `SetTemplate` and `SetCategoryId` from `@akasha/temper-equipment` and exports none of those four names. `no-re-export.code-check.ts` carries `runsOnPatch`, `runsOnWorktree`, `runsOnDeploy` and `runsOnAudit` all true, with the invariants at lines 17, 22 and 26 covering the renaming case and the type-only case by name. A seat repointing `temper/web` read the absence as a gap in the twin and routed twelve files at `SetTemplate` and `SetId` under the same local names instead. That routing is the recreation rather than a workaround, and it is exact, because the alias chain is written in the old source. Worth keeping apart: the old file exports both `setsAll`, a `DataFile` value, and `SetsAll`, a type. Reading the case variant as a rename binds a value where a type is wanted, which was measured at nine sites.',
} as const satisfies Finding
