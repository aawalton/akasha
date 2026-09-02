import type { Finding } from "../finding.page-type.ts"

export const anExportNameCensusAnswersAbsentForDataThatLandedRePartitioned = {
  id: "01a0627c-48d9-773b-af69-2313a0367173",
  pageTypeSlug: "finding",
  slug: "an-export-name-census-answers-absent-for-data-that-landed-re-partitioned",
  domainSlug: "domain/temper",
  claim:
    "An exported-name census answers absent where the data did land. One-const-per-file generator input lands re-partitioned and keyed by id, so not one of the old names survives and every one reads as a gap. Normalising for re-casing does not reach this, and a seat trusting the name count reads a package as barely migrated when it is nearly whole.",
  evidence:
    "A name census over game-characters-stats answered 286 of 348 exported names absent from akasha. 282 of those are `src/metrics/data/*-metric.ts`, one exported const each, which `bun run generate-metrics` composes into four partitions; akasha holds the same data as METRICS_DATA_01 through 16, keyed by metric id, exporting none of the 282 names. Four more are the partition consts themselves.\n\nImporting both sides and walking them answered 282 metric ids on each, none only on one, 4,298 leaves compared and 0 differences. Seeding a renamed leaf, a dropped id and an added id made it answer 1, 1 and 1. So the real gap behind those 286 was 0, and the 18 modules that were genuinely absent were the adapters, which the same census had already named.\n\nNormalising on lowercase-minus-underscores, which another cluster measured at roughly 2x, moved 2 names across this whole cluster: allRaceSources to ALL_RACE_SOURCES, and a false match of the type alias SetsAll onto the const setsAll. Re-partitioning cost 7.8x here and re-casing cost 1.003x.\n\nThe same shape hid two more: TEMPER_PLAYER_{ARMOR,JEWELRY,WEAPON}_TRAIT_TO_ESO read as absent because temper-equipment inlined the generated file into eso-trait-map as module-private consts. Six exports, 69 leaves, 0 differences.",
} as const satisfies Finding
