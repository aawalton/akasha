import type { Finding } from "../finding.page-type.ts"

export const theFormulaFrameworkRecreationRenamedWhatItsCallersImport = {
  id: "01a0607a-9cc0-77ad-aade-922dd855a8b6",
  pageTypeSlug: "finding",
  slug: "the-formula-framework-recreation-renamed-what-its-callers-import",
  domainSlug: "domain/temper",
  claim:
    "Fourteen of the specifiers temper-formula-framework answers to differ from the ones @temper/shared-formula-framework answered to, and three exported names differ. A seat repointing a caller cannot do it by swapping the package name alone. The mapping is written out here so the repoint is mechanical.",
  evidence:
    "The package name @temper/shared-formula-framework becomes @akasha/temper-formula-framework. Specifiers that changed: /effects-types and /effect-types both become /effect; /formula-types becomes /arithmetic-node; /formula-evaluator becomes /arithmetic-evaluate; /display-formula-types becomes /display-formula-node; /display-formula-converter becomes /display-formula-convert; /utils/create-source-file becomes /source-file; /utils/map-of becomes /map-of; /source-categories-data becomes /source-category; /base-stat-constants becomes /base-stat; /rating-utils becomes /rating-chance; /format becomes /number-format; /icon-utils becomes /eso-icon-url; /branded becomes /branded-id; /metric-ids.generated becomes /metric-id. src/object-utils.ts split in two: valuesOf, keysOf, getFromPartialRecord and typedPartialRecordKeys are in /record-parts, and randomFrom is in /random-from. The six buff and debuff wrappers keep their names. Three exported functions were renamed to satisfy lower-camel-case: BuildHash, BuildId and EsoCharacterId became buildHash, buildId and esoCharacterId, while their types keep the old capitals. src/effect-types.ts, which only re-exported Effect and isMetricEffect from src/effects-types.ts, was dropped.",
} as const satisfies Finding
