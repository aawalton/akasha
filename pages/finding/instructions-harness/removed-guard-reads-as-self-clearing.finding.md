---
id: 1288e1fd-4b95-5075-a55f-48429cf36012
slug: removed-guard-reads-as-self-clearing
page-type-slug: finding
title: "Removed guard reads as self clearing"
domain-slug: domain/global
---

# Claim

`hooks-delivered` classifies a live seat carrying a guard this estate has since removed as self-clearing, so a seat running with a bypass or a check the tree has dropped stands under an advisory rather than a refusal for as long as that seat lives.

# Evidence

Measured 2026-08-04 by this lead, verifying #17846. `classified` is symmetric across its two arms: a payload entry the repository no longer registers is self-clearing wherever the payload agreed with HEAD at that seat's launch. Driven directly through six constructed cases, a registration present in the payload and dropped from the tree since launch returns `extra.selfClearing`, which yields `advisory` and exit 0.

Re-read 2026-08-27 in `/var/home/walton/repos/akasha`, where the check now stands at `tools/audits/hooks-delivered.ts` and is registered in `tools/run-checks.ts:56`. The symmetry is unchanged. `classified` is declared at line 86, and line 103 reads `selfClearing: extra.filter((one) => then.has(one))`. At line 200 each `extra.selfClearing` member is pushed onto `notices` as `hook-dropped-since-launch`, while each `extra.real` member is pushed onto `refusals` — so a live seat carrying a guard the tree has dropped is still a notice and not a refusal.

The symmetry is correct on its own terms and the docblock argues it: the file moved and the payload could not, so nothing written into the tree reaches that seat. What it collapses is severity. Missing a newly added guard and carrying a removed one are both remedied by cycling the seat, but only the second means a live seat is running with an escape the estate has decided to withdraw.

The shape is not hypothetical. #17846 was cut over four seats found running the code repository's hook mirrors, one carrying a bypass this tree had removed hours earlier, and that discovery is what earned the check its place. Under the classifier as landed that incident reads as advisory: pid 162775 started 08:41:47 with a payload matching commit 6287d113 entry for entry, and the mirrors were repointed nine minutes later.

Seat lifetimes make the window wide. Live seats measured the same day carried launch instants over twelve hours old.
