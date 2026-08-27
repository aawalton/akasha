---
id: 59eb31bf-bc45-5963-b149-767d00418391
page-type-slug: finding
title: "One schema over two kinds of body"
domain-slug: page-type/refusal
---

# Claim

One schema governs two kinds of body: `tools/document/schemas/refusal.ts` is written for a body an instrument prints "when it stops an agent", and 73 of the 77 refusal slugs are printed by checks rather than gates — where nobody is stopped and there is no act the reader was in the middle of.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/domain-parent-unresolved.md` dispatched from `review-documents`. The reading raised the question; the counts were taken here.

`tools/document/schemas/refusal.ts` opens: "A refusal document: one body an instrument prints when it stops an agent." Its own header calls it "the one text an agent reads while it is blocked", and the paragraph ceiling is set on that ground.

Counted across `tools/`: 21 checks call `refusalText` against 7 gates, citing 73 distinct slugs against 4. `tools/checks/domain-edges.ts` alone carries fourteen bodies, and says in its own header that a check "has no pending repo to ask", which is why its reader is `fromDisk` — nobody is mid-act.

One defect already carries both bodies, split exactly on printer. `refusals/slug-already-claimed.md`, printed by `tools/gates/domain-slug-unique.ts`, closes on "Declare a slug nothing else does, or drop the key here and leave the domain where it already is." `refusals/domain-slug-declared-twice.md`, printed by a check for the same duplicate slug, names no act, and neither do its shape-siblings `default-claimed-twice` and `persona-champion-claimed-twice`. The gate's reader is mid-write and holding the shell; the check's reader is running a sweep with no necessary relation to either claimant.

This bears on `pages/finding/refusal/remedy-unsettled-at-the-schema.finding.md`, which records 87 of 118 bodies carrying diagnosis alone. If most are check bodies, they may be right to carry no act and the schema's sentence is what is wrong — settling that finding rather than opening 87 repairs.

Not measured: how all 118 documents divide by printer — the 77 slugs counted are those cited literally, and `refusals-bound` pairs 118 documents against 32 instruments.
