import type { Finding } from "../finding.page-type.ts"

export const oneInventoryReadingIsFiledUnderTwoMomentsWithTwoTotals = {
  id: "01a0675d-dda6-7352-b1c5-61ec83c8cb19",
  pageTypeSlug: "finding",
  slug: "one-inventory-reading-is-filed-under-two-moments-with-two-totals",
  domainSlug: "domain/temper-holdings",
  claim:
    "The captures 2026-08-19-23-46-47 and 2026-08-20-13-58-00 are byte-identical across all 3 of their shards, so two snapshot pages fourteen hours apart carry one reading of the bags counted twice. Their landed `stacks` sidecars are 4,422 rows each and hash the same once the row ids are removed. Their `totalValue` differs, 516395436.74359727 against 516795362.2235968, so that total was worked out from something other than these bytes.",
  evidence:
    "Measured 2026-09-03 by sha256 over each of the 458 files under `pages/temper-inventory-chunk`, one file at a time. There are 458 files and 454 distinct hashes. Two of the four repeats are the three shards of 2026-08-19-23-46-47 matching the three shards of 2026-08-20-13-58-00 index for index, 900,002, 900,001 and 630,048 bytes, and the two concatenations hash the same as well.\n\nBoth snapshot pages are landed and both carry a sidecar of 4,422 rows. Removing the `id` from every row and hashing what is left gives one hash for both files. No row id is shared between them, so the recreation minted a fresh set for each and nothing links the two.\n\nThe pages differ where the bytes do not. `at-2026-08-19-23-46-47` states `totalValue: 516395436.74359727`, `at-2026-08-20-13-58-00` states `516795362.2235968`, a gap of 399,925.48 gold over a reading of the same bags. Whatever produced the total read prices or something else outside the sharded document.\n\nWhat follows for the row accounting: of the 674,612 `stacks` rows in akasha, 4,422 are one reading counted twice rather than two readings. Carrying both is right while the repository holds two snapshot pages, and the duplication belongs on the page rather than in the rows. The fourth repeat is a different matter and is in `eleven-thousand-slots-sit-in-the-six-truncated-prefixes-and-nowhere-else`.",
} as const satisfies Finding
