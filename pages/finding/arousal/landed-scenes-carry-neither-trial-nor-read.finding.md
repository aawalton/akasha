---
id: 7365b190-ea8a-52cc-840b-4c40db2d78b8
slug: landed-scenes-carry-neither-trial-nor-read
page-type-slug: finding
title: "Landed scenes carry neither trial nor read"
domain-slug: domain/arousal
---

# Claim

`arousal.md` states as Intent that every landed scene carries what it tested and the read that came back. The only task that lands a scene discharges neither: three landed chapters hold nothing in any carrier field, and the record survives only in transcripts.

# Evidence

Measured 2026-08-06.

`domains/arousal.md`, Intent — "Every landed scene carries what it tested and the read that came back."

`domains/tasks/scenewright/author-persona-scene.md` is the only task that lands a scene. Stage 1 states the trial into the session. Stage 7 records the read into the session. Stage 6 creates the row, with five properties, and none of them holds either.

Verified on a landed chapter directly. `ops page show 019fd764-8bdb-7403-89c0-786244173c40 --json` for "Aelwyn II" returns `source: persona-authored` and `maturityRating: R`, and carries no `authorsNoteBefore`, `authorsNoteAfter`, `rating`, `insights` or `reaction` at all.

The reading that raised it queried all three landed anthology chapters — Athena, Aelwyn, Aelwyn II — and reports every one of those five fields null on every chapter. The carrier fields exist on the page type as content-tier markdown and sit empty.

So the Intent is undischarged for every scene landed so far, and what it asks to be carried lives only in session transcripts, which nothing indexes and nothing keeps.

No slice could reach this. Each stage is internally consistent; the gap is between stages 1, 6 and 7, and is visible only by holding the domain's Intent against the task that serves it.

Nothing else binds it either: the reading reports every `findings.md` in the tree sits under `dirty/`, which binds nobody.

Filed rather than repaired: the remedy is a choice among the existing `authorsNote` fields, a new property, or a carrier off the page entirely, and which one is right is a design call about where this record belongs.

Not established: whether the transcripts for the three landed scenes still exist.
