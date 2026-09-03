import type { Finding } from "../finding.page-type.ts"

export const twoSiblingCurrencyFieldsLookAlikeAndOnlyOneIsRedundant = {
  id: "01a0675a-8cc6-776f-8141-3057b25a27d8",
  pageTypeSlug: "finding",
  slug: "two-sibling-currency-fields-look-alike-and-only-one-is-redundant",
  domainSlug: "domain/temper-holdings",
  claim:
    "`currencies.characters[*].displayName` and `currencies.characters[*].lastScanned` sit side by side in every capture and look like the same duplication of the matching `locations[*]` fields. Only the first is. Across the 151 parsing captures there are 3,000 character currency records: 3,000 of 3,000 display names equal the location's, and 2,854 of 3,000 scan times do, so 146 differ. Dropping both because one was proved duplicated would destroy 146 measurements.",
  evidence:
    "Measured 2026-09-03 by walking all 151 parsing captures rather than sampling. For each capture, for each key of `currencies.characters`, the same key is looked up in `locations`. Every one of the 3,000 records has a matching location, so no comparison was skipped.\\n\\n`displayName`: 3,000 equal, 0 differ. `lastScanned`: 2,854 equal, 146 differ. The differences are small and real rather than a type mismatch: 141 of the 146 are the character record being one second later than the location record, and the other five are 213, 615, 650, 930 and 1,805 seconds later. The character's currencies were read a moment after that character's bags.\\n\\nBefore believing the 0, one parsed record was seeded: `2026-08-19-23-46-47` `characters[8796093025190173].displayName` went from `Lyonette du Marquín` to that name with `-SEEDED` appended. The comparer moved from 3,000 equal and 0 differing to 2,999 and 1, and back to 3,000 and 0 once restored. So the 0 is a real zero rather than a blind comparer.\\n\\nThe reason to record this is the shape of the mistake it invites. A sweep that walks the folder, notices one sibling is fully duplicated, and drops the pair loses a field nothing else holds. `an-inventory-reading-holds-more-than-its-slots` counts character `lastScanned` among the rows held nowhere else; this is the measurement behind that.",
} as const satisfies Finding
