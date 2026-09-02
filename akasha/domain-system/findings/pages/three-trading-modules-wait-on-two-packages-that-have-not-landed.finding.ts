import type { Finding } from "../finding.page-type.ts"

export const threeTradingModulesWaitOnTwoPackagesThatHaveNotLanded = {
  id: "01a060ab-ec72-7286-afe1-fc10ab12de08",
  pageTypeSlug: "finding",
  slug: "three-trading-modules-wait-on-two-packages-that-have-not-landed",
  domainSlug: "domain/temper",
  claim:
    "The trading chain came into akasha as three packages, and three of its modules stayed behind. `sell-pricing` reaches `@temper/game-items-core`, `companion-gear-price-lookup` reaches `@temper/game-companions-core`, and `base64url` reaches a declaration file that does not parse. Each lands as soon as the one thing it reaches is in akasha, and none of the three needs a decision.",
  evidence:
    "`temper/game-trading-core/src/sell-pricing.ts` line 1 imports `parseItemLink` from `@temper/game-items-core/item-link-parser`. That is the only edge out of the package. Its four siblings landed as `akasha/temper/temper-trading-listings`. `item-link-parser.ts` is 2,526 bytes and imports nothing at all, so it moves the moment a seat gives it a home; putting it in a trading package would be the wrong home.\n\n`temper/game-trading-pricing/src/companion-gear-price-lookup.ts` lines 2 and 3 import the types `CompanionEquipmentQualityId` and `CompanionTraitId` from `@temper/game-companions-core/equipment`. Both are unions read off generated data tables, so neither can be restated without drift. Its six siblings landed as `akasha/temper/temper-trading-pricing`.\n\n`temper/shared-foundation-misc-codec/src/base64url.ts` line 10 calls `string.len`, declared only in the `tstl-eso-sandbox` file that answers 51 parse errors. Its three siblings need only enum and function declarations that parse.\n\nWhat holds each back is one edge, and the source of each package is untouched, so no consumer of the held-back modules is broken. `@temper/game-trading-pricing/companion-gear-price-lookup` is read by `player-economics-ui` and `player-economics-core`; `@temper/game-trading-core/sell-pricing` is read by `game-trading-addon/src/sell-helper.ts`.",
} as const satisfies Finding
