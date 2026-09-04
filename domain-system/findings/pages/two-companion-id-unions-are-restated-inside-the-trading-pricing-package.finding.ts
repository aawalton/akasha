import type { Finding } from "../finding.page-type.ts"

export const twoCompanionIdUnionsAreRestatedInsideTheTradingPricingPackage = {
  id: "01a060c6-9711-7d7a-8afb-a44f6117e691",
  pageTypeSlug: "finding",
  slug: "two-companion-id-unions-are-restated-inside-the-trading-pricing-package",
  domainSlug: "domain/temper",
  claim:
    "`companion-gear-price-lookup` reads `CompanionTraitId` and `CompanionEquipmentQualityId`, which `@temper/game-companions-core` derives from generated tables. An akasha file may import nothing outside akasha, so both unions were restated as literals in `akasha/temper/temper-trading-pricing/companion-gear-ids`. One fact is written twice in the tree, and the restatement should go when `game-companions-core` lands.",
  evidence:
    "An earlier finding, removed at `239d6d222c` once its three modules landed, judged that neither union could be restated without drift. That judgement was made without checking the akasha catalog, and the catalog settles it.\n\n`akasha/temper/temper-catalog/temper-companions/companion-traits/pages/` holds exactly ten pages: `aggressive`, `augmented`, `bolstered`, `focused`, `no-trait`, `prolific`, `quickened`, `shattering`, `soothing`, `vigorous`. `temper/game-companions-core/src/generated/temper-companion-trait.generated.ts` holds exactly those ten keys.\n\n`akasha/temper/temper-catalog/temper-companions/companion-equipment-qualities/pages/` holds exactly six: `epic`, `fine`, `legendary`, `no-quality`, `normal`, `superior`. The generated quality table holds exactly those six ids.\n\nSo the restatement is drift-free as it lands, and akasha already carries the authoritative set as pages. What akasha lacks is a module deriving an id union from a page collection, which is why the restatement is literals rather than a derivation.\n\nHow to collapse it. When `game-companions-core` lands, delete `akasha/temper/temper-trading-pricing/companion-gear-ids`, drop its two `partSlugs` and manifest entries, and point `companion-gear-price-lookup.module.code.ts` at the landed companion module. Nothing outside the package reads `companion-gear-ids` today.",
} as const satisfies Finding
