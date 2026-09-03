import type { Finding } from "../finding.page-type.ts"

export const anInventoryReadingHoldsMoreThanItsSlots = {
  id: "01a06079-e46e-7439-8bc0-91365d3f28a6",
  pageTypeSlug: "finding",
  slug: "an-inventory-reading-holds-more-than-its-slots",
  domainSlug: "domain/temper-holdings",
  claim:
    "The rows now beside each inventory reading carry what was in its bags and nothing else. A reassembled capture also states the account's currencies, every character's crafting ranks, the transmute crystal count and its cap, each location's name, scan time and bag sizes, the furnishings placed in each house, and on 62 of 151 captures a set of open cooldowns. None of that reached akasha with the rows.",
  evidence:
    "A capture's top level is `locations`, `meta`, `currencies`, `craftingLevels`, `transmuteCrystalCap`, `transmuteCrystalAmount`, and on 62 of the 151 readable captures `openCooldowns`. The `stacks` entry shape carries `locations[*].bags[*][*]` alone, one slot to a line, so a location's `displayName`, `lastScanned`, `bagSizes` and `placedFurnishings` fall outside it.\n\n`meta` holds displayName, worldName, lastFullScan and priceSource. `currencies` divides into `characters` (per character: displayName, lastScanned, and a gold balance), `bank` (gold, writVouchers, alliancePoints, telvarStones) and `account` (transmuteCrystals, undauntedKeys, tomeTokens, crownGems, tomeChallengeRerolls, archivalFortunes, tomePointCaches, crowns, tomePoints, endeavorSeals, tradeBars). `craftingLevels` maps each character to a rank per craft. Across the 151 captures there are 450 `placedFurnishings` maps, one to a house to a capture, and those 450 maps hold 80,850 furnishing rows between them, each row holding itemName, quality, itemLink and collectibleLink.\n\nAkasha already carries 16 `temper-inventory-currency` pages naming the currencies above, so the balances have somewhere to point when someone shapes them. Nothing is lost yet, because `pages/temper-inventory-chunk` is not deleted and holds the only copy.",
} as const satisfies Finding
