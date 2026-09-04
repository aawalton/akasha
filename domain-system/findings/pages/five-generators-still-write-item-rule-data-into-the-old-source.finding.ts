import type { Finding } from "../finding.page-type.ts"

export const fiveGeneratorsStillWriteItemRuleDataIntoTheOldSource = {
  id: "01a0615d-ca73-7ba1-8355-aa51c33fa2b4",
  pageTypeSlug: "finding",
  slug: "five-generators-still-write-item-rule-data-into-the-old-source",
  domainSlug: "domain/temper",
  claim:
    "Five generated tables of temper's item rules now stand in akasha, but the generators writing them still emit into `temper/game-items-rules-core/src/generated`. Running `temper-addon-data-generate` refreshes the copy nothing reads and leaves the akasha copy where it was. Nothing fails, and the two copies drift the moment a source page changes.",
  evidence:
    '`akasha/temper/temper-addon-generators/temper-comparison-op/temper-comparison-op.module.code.ts:62` writes the string `@temper/game-items-rules-core/filters/comparison-op-data` into its own output header and emits `import type { ComparisonOpTemplate } from "../filters/comparison-op-data"`, a path that exists only in the old tree. The akasha recreation folds that table into `comparison-op-data` and imports nothing, following the shape `temper-equipment-kinds/weapon-bars` set. The same holds for `temper-rule-template` (landed as `rule-template-table` split two ways over the byte ceiling), `potion-restore-metrics` (folded into `potion-restore-resolve`), `scribing-total-script-count` and `inventory-rule-conditions`, the last of which has not landed at all. Repointing the generators was not done here because `temper/game-items-rules-core` still exists and is still imported by 15 outside packages, so moving the output would break the tree that is still being read. It belongs with that folder\'s teardown.',
} as const satisfies Finding
