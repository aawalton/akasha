import type { Finding } from "../finding.page-type.ts"

export const anExportNameCensusCountsAGeneratorAsTheCodeItEmits = {
  id: "01a0615d-ca73-7e6b-a439-b882f104fff7",
  pageTypeSlug: "finding",
  slug: "an-export-name-census-counts-a-generator-as-the-code-it-emits",
  domainSlug: "domain/temper",
  claim:
    "A folder-name census is known to be no evidence that a package landed. An exported-name census is no evidence either. A generator holds the code it writes inside a template literal, so the names it emits read as its own exports, and a scan that skips no template literal answers that the generated data landed when only the generator did.",
  evidence:
    "Resolving the 47 cross-package imports of the six item-rules packages by exported name gave four confident hits into `temper-addon-generators`: `item-category-tree`, `temper-eso-companion-equipment-constant`, `temper-companion-jewelry-slot` and `temper-companion-weapon-type`, each matching every name the importer wanted. Reading `temper-addon-generators/item-category-tree/item-category-tree.module.code.ts` shows one real export, `generateTemperItemCategoryTree(rows): string`; `ITEM_CATEGORY_PRIORITY` and `ITEM_CATEGORY_TREE` occur at column 0 inside the backtick template that function returns. `rule-types` is the same shape and would have offered `ComparisonOp`, `ItemAction`, `CompiledRuleConfig` and eleven more. Repointing on those hits would have imported a module that exports none of them, and the failure would have surfaced as TS2305 in whichever wave landed next rather than in the wave that made the mistake. Stripping backtick spans before matching cut 19 confident hits to 19 and dropped all four false ones.",
} as const satisfies Finding
