---
id: e8738e59-5e09-55f4-930d-d6ebc93a10bd
page-type-slug: finding
title: "Row status written into prose"
domain-slug: domain/global
---

# Claim

An instruction whose meaning turns on a row's current status is malformed: it reads as standing guidance and is a reading taken on a day. The row moves without telling anyone, so the sentence goes false while still being obeyed. Nothing in the corpus states this generally — `domains/memory.md` **End State** binds one instance of it, an objective's description, and reaches no further.

# Evidence

The judgment, in the words of the lead who wrote it. `dirty/skills/medicine/rulings.md`, emptied 2026-08-07: "If an entry's meaning would change when its row's status changes, the entry is malformed. Membership in any set of rows is queried at read time and never written here; ordering may be written, because judgment has no field." It stood as the document's own admission criterion, so every entry beneath it was written against it.

What the corpus carries. `rg -uuu -in` over `~/instructions/domains/` for `queried at read time|work-state|row's status|never written here|still holds once` returns exactly one line: `domains/memory.md:27`, the **End State** rule — "Write an objective's description so it still holds once its box is checked", warranted by a checked box turning its description into the reason the objective is met, so one written as the gap that stood is false exactly where someone relies on it and nothing re-reads a box already ticked. That is this judgment scoped to one field of one kind of memory document. `domains/instruction.md` carries a Definition and an Intent and no Rules at all.

The cost, measured on the reader's half of the same joint. A seat on this sweep read `GATE_DIMENSIONS_SEED` out of the code repo, treated its twenty entries as the census, and kept a claim on the ground that four dimensions were missing. `ops awen gm-load --game the-tower` returns twenty-four; all four were live. The keep landed and was withdrawn four commits later. Much of this estate is page rows rather than source, and a claim written against the wrong substrate reads identical to one written against the right one.

Why nothing reports it. A status-dependent sentence and a standing one are the same prose. The row that would falsify it is in another system, on nobody's review schedule, and `tools/stale-reviews.ts` measures characters moved in the repo rather than anything about the data a document rests on.

`-uuu` throughout; bare `rg` reaches only tracked, non-hidden files.
