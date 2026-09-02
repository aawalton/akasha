import type { Finding } from "../finding.page-type.ts"

export const zeroPlantGramsIsAReadingWhereZeroSurplusHoursIsNot = {
  id: "01a06221-d65f-7977-ac71-6d13572ef6b3",
  pageTypeSlug: "finding",
  slug: "zero-plant-grams-is-a-reading-where-zero-surplus-hours-is-not",
  domainSlug: "domain/plants",
  claim:
    "The two upkeep tiles treat a zero oppositely, and both are right. A surplus of zero is refused as no reading; plant grams of zero are kept as a reading. The rule is not the number but where the number came from and where the scale puts it.",
  evidence:
    "`upkeep-surplus.readout.code.ts` refuses a zero through `heldNothing`: surplus derives from sleep less spend, so a day holding neither subtracts to zero, and the surplus scale puts zero on the green rung. An empty day would show healthy. Plant grams come from adding up food entries, so zero means the entries were counted and nothing was eaten; the plant-grams scale has no rung below forty, so zero shows black. A day that has begun with nothing eaten is a true black rather than a false green. Refusing the zero instead would leave the tile blank all morning, which says less. The markdown page this migrated from carried no ruling either way: `readouts/query/food-entry-plants-since-waking.page-query.md` says `function: sum` and stops there, and a sum over no rows is zero. So the call taken here keeps zero as a reading, and `upkeep-plants.readout.ts` states it: a day holding no food entry is a reading of zero rather than no reading. What would overturn it is Alan saying an untouched tile should read no signal until the first thing is eaten.",
} as const satisfies Finding
