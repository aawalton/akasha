import type { Finding } from "../finding.page-type.ts"

export const theTemperDataGeneratorsWriteWhereAkashaNoLongerHolds = {
  id: "01a0607a-9cc0-7362-aa7c-b4c6c1775333",
  pageTypeSlug: "finding",
  slug: "the-temper-data-generators-write-where-akasha-no-longer-holds",
  domainSlug: "domain/temper",
  claim:
    "ops temper addon-data generate writes src/generated/*.generated.ts files the akasha recreations no longer keep as separate files. temper-formula-framework folded each generated table into the module wrapping it, and temper-classes did the same. Regenerating today writes only to the source packages, so the akasha copies drift as soon as the pages change. The generator has to learn the akasha layout before either copy can be trusted.",
  evidence:
    "In temper/shared-formula-framework, six 312-byte wrappers under src/buffs-and-debuffs/ each did nothing but call createDataFile on a table in src/generated/. The akasha recreation merged each pair into one module: buffs-major, buffs-minor, buffs-other, debuffs-major, debuffs-minor and debuffs-other. src/source-categories-data.ts and src/generated/temper-source-category.generated.ts merged into module/source-category the same way, and temper/game-characters-classes/src/classes-data.ts merged with its generated table into module/character-class. src/metric-ids.generated.ts became module/metric-id on its own. Every DO NOT EDIT banner was stripped, because akasha refuses a first line carrying prose. tools/lib/temper-addon-data/output-dirs.ts line 28 sets TEMPER_SHARED_OUTPUT_DIR to shared-formula-framework, and tools/lib/temper-addon-data/generators/classes.ts line 63 imports ClassId from the old specifier.",
} as const satisfies Finding
