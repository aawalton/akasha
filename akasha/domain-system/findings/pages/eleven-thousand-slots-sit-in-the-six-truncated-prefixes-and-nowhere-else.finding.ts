import type { Finding } from "../finding.page-type.ts"

export const elevenThousandSlotsSitInTheSixTruncatedPrefixesAndNowhereElse = {
  id: "01a0675a-8cc6-7bb2-ae6a-046c96267289",
  pageTypeSlug: "finding",
  slug: "eleven-thousand-slots-sit-in-the-six-truncated-prefixes-and-nowhere-else",
  domainSlug: "domain/temper-holdings",
  claim:
    "The 6 captures that do not parse are not empty. `locations` is the first top-level key of every capture, so each truncated prefix holds whole item objects up to the break: 1,596, 1,697, 1,683, 1,684, 1,683 and 3,348, or 11,691 together. Their snapshot pages carry no `stacks` sidecar, so those 11,691 slots are in akasha nowhere. Keep the 7 shard files until someone settles whether to recover them.",
  evidence:
    'Measured 2026-09-03 over `pages/temper-inventory-chunk`. Rejoining each of the 157 capture groups in chunk-index order and parsing gives 151 parsed and 6 refused. The 6 are 2026-08-21-22-50-38 and 2026-08-21-23-20-05 at 900,002 bytes, 2026-08-23-17-49-17, 2026-08-23-18-45-06 and 2026-08-23-19-46-46 at 900,001 bytes, one shard each, and 2026-08-23-19-57-23 at 1,800,003 bytes across two. With trailing whitespace removed each is an exact multiple of 900,000, and each ends mid-token, one on `\\"saleAvg\\":11.64,\\"min`, another on `\\"30\\":{\\"itemId\\":68215,\\"itemName\\":\\"Recipe:`.\\n\\nA bracket-matched walk of each prefix, honouring strings and their escapes, counts the objects closing at the slot depth of `locations` to `bags` to slot: 1,596, 1,697, 1,683, 1,684, 1,683, 3,348. The same walk over the readable capture 2026-08-19-23-46-47 counts 4,422 there, and parsing that capture and counting `locations[*].bags[*][*]` gives 4,422 as well, so that depth is the item depth.\\n\\nEverything after `locations` is beyond the break for all 6: `meta`, `currencies`, `craftingLevels`, the transmute pair and `openCooldowns`.\\n\\nThe recovery that would work is the same walk again as a writer: stream the prefix, stop at the last item object that closes, and emit those slots as that snapshot\'s `stacks` rows. It reaches the slot grain alone, since nothing else of those 6 was written to a shard that survived.\\n\\nThe cost of not doing it is that 6 of 157 readings hold no slot anywhere in akasha while the other 151 are whole, and deleting the 7 files ends the option for good.',
} as const satisfies Finding
