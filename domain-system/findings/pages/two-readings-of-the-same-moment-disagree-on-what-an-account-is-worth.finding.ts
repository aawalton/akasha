import type { Finding } from "../finding.page-type.ts"

export const twoReadingsOfTheSameMomentDisagreeOnWhatAnAccountIsWorth = {
  id: "01a05fdf-9a2d-73e8-bfbf-00fd2252447e",
  pageTypeSlug: "finding",
  slug: "two-readings-of-the-same-moment-disagree-on-what-an-account-is-worth",
  domainSlug: "domain/temper-holdings",
  claim:
    "An inventory snapshot and a net worth reading taken at the same millisecond by the same account give different totals. 151 of the 162 snapshots share a moment with a net worth reading, and only one of the 151 agrees on the number. Nothing in temper says which total answers the question of what an account is worth.",
  evidence:
    "Matching on the account and the millisecond, 151 of 162 `temper-inventory-snapshot` pages meet a row in a `temper-net-worth-hour` entry file. Comparing `total-value` against `totalValue` within one gold, 1 of the 151 matches.\n\nThe two are read differently: a net worth row sometimes carries `goldAmount`, `currencyGoldValue`, `itemValue` and `excludedGuildBankValue`, and 672 of 3,395 rows do, so a net worth total takes money and left-out guild bank goods into account where a snapshot total counts what the capture covers. Neither number says which it is.\n\nBoth landed as recreated, on `temper-holdings-thing`, which declares `captured-at` and `total-value` for both. The gap is that one property named `total-value` carries two measures.",
} as const satisfies Finding
