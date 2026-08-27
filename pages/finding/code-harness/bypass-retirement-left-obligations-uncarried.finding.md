---
id: d2fd9dee-5e63-53df-a58b-e66a5883233a
page-type-slug: finding
title: "Bypass retirement left obligations uncarried"
domain-slug: domain/global
---

# Claim

Retiring the direct-landing bypass left two obligations it had created with nothing
carrying them: a row parked explicitly on the sentinel lifting, which has lifted and
which nothing told, and a promise of post-hoc CI reconciliation that was deleted
along with the rule that made it.

# Evidence

Measured 2026-08-04. Instructions commit `b9ee5305` retired the bypass at 11:01:07.

THE PARKED ROW, project #17673, since converted to `pages/finding/project/detector-reads-stale-notes.finding.md` — "Deploy the stale-project-detector service
change that landed on main under the sentinel" — said in terms: "DO NOT START THIS
WHILE THE SENTINEL STANDS. Read `~/.allow-direct-main` rather than recalling it...
This row is cut now so the deferral is recorded and not rediscovered; it is
claimable when the sentinel lifts and the backlog reconciles through CI."

The sentinel lifted. `ops project show --seq 17673` reports `status someday_maybe`,
`owner athena`, `updatedAt 2026-08-04T02:47:13Z` — untouched since before the
retirement. The row named its own unblock condition in prose, the condition was met
about nine hours later, and nothing reads prose for a met condition.

THE DELETED PROMISE. `git show b9ee5305 -- folders/code-repo.md` removes the rule
Unverified Handback, whose reason read: "The hand-back gate demands a verdict this
route cannot mint... What CI would have caught is reconciled once the sentinel is
lifted." The reconciliation was owed by the rule. The rule is gone, and the debt it
named went with it — no row, no finding, no list of what closed under it.

Both are the same shape: the retiring commit removed the instruction and left what
the instruction had deferred. `ops seat blocked-census` reads `blockedOn` records
and `awaiting_*` statuses; neither carrier was used here, because the deferral was
written as prose in a document and as a reason inside a rule.

NOT MEASURED. How many rows closed under Unverified Handback while the sentinel
stood, and whether any of their content is on `origin/main` unverified by main CI.
For #17755's three sentinel-era commits I checked and all three reached
`origin/main` under new SHAs, so that row at least lost nothing.
