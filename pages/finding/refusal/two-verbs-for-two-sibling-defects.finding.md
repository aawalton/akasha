---
id: 72d0bed1-60a1-5720-a181-ce5f920e01c6
slug: two-verbs-for-two-sibling-defects
page-type-slug: finding
title: "Two verbs for two sibling defects"
domain-slug: page-type/refusal
---

# Claim

Two sibling defects in the findings store are repaired by two different verbs because `rehome-finding` refuses an unfoldered path: `finding-misfiled` can name it, `finding-unfoldered` has to name `ops memory mv` instead.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/finding-unfoldered.md` dispatched from `review-documents`. The reading added the remedy and named the fork; both bodies were read here after it landed.

`tools/rehome-finding.ts` fails any path whose `segments.length !== 3` — "one lives at `findings/<domain>/<name>.md`, exactly one folder deep". An unfoldered finding has two segments, so the verb whose name is the obvious reach refuses the case outright. The reading confirmed it with a live dry run against `findings/flat-claim.md`.

The two bodies now read: `finding-misfiled` — "`ops memory rehome-finding` moves it there and repoints whatever cited the old path"; `finding-unfoldered` — "`ops memory mv` carries it there and repoints whatever cited the old path". One verb moves the key and the folder together; the other moves the file and repoints citations, leaving the key to whoever runs it.

Widening `rehome-finding` to take an unfoldered path would make one verb answer both defects, and would make the sentence just added to `finding-unfoldered` stale.

The same reading landed an adjacent repair on `finding-misfiled`, which had named `ops instructions rehome-finding` — a spelling that resolves against the instructions repo and answers "does not name a finding" for every file that body prints about. That repair is why `findings/refusal/remedy-names-a-verb-without-its-repo.md` was deleted rather than left standing.

Not measured: what widening the verb would cost at its other guards, or whether any finding sits unfoldered today.
