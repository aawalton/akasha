---
id: d4eae3dd-10dc-5e73-89d8-97eacba8d273
page-type-slug: finding
title: "Reviewed at has no timezone"
domain-slug: page-type/domain
---

# Claim

`reviewed-at:` has no declared timezone, and two readings in one pass wrote different dates for the same night. The schema calls it the day the document was last read whole and judged. Around UTC midnight on 2026-08-07 local, three reviewers wrote 2026-08-07 and a fourth wrote 2026-08-08, so the corpus now carries a review date ahead of the local day it was taken on.

# Evidence

Observed by the dispatcher of a review-documents pass, across readings dispatched within roughly an hour of each other.

`domains/global.md` and `domains/jargon.md` carry `reviewed-at: 2026-08-07`, landed by commits `07346e63` and `4cf171c5`. `domains/lists/unresolved-checks.md` carries `reviewed-at: 2026-08-08`, landed by `5a040e6a9`. Local time at the moment I checked was Fri Aug 7 23:47 MDT, which is 2026-08-08 in UTC — so both values describe the same night and neither reviewer was careless.

`tools/document/schemas/domain.ts` specifies the key as a `date` and says of it only that the date is of the reading rather than of any edit. Nothing there or in `tools/stale-reviews.ts` names a zone.

The instrument is not misled: `stale-reviews.ts` measures characters moved since the commit that wrote the value, not the value, so a day either way changes nothing it reports. What the divergence costs is a reader comparing two documents' dates, and a date that reads as the future to Alan.

Not measured: how many documents in the corpus carry a `reviewed-at` ahead of the local day of their commit. I checked only these three.
