---
id: a6af9468-f40e-54aa-a107-a5cc78091396
slug: classsets-populated-unverified
page-type-slug: finding
title: "Classsets populated unverified"
domain-slug: domain/temper
---

# Claim

Whether `lib.classSets` (LibSets) is ever populated is unresolved: `constants/all-classdata.ts:41` has it commented out while `api-settype-predicates.ts:215` asserts it present via `asPresent(lib.classSets)`, leaving `IsClassSet`, `GetClassSets` and `GetAllClassSets` unverified. If never populated, the failure is a hard `attempt to index a nil value` on a public API, not a silent wrong answer.

# Evidence

From project #16030 (domain `temper`, parent #15872 "Temper in-game readiness audit"), owner ember, created 2026-07-25. No objective was ever written; this is the project's full capture.

Handed back unresolved by the `core/` reader, who ran out of budget before determining whether `classSets` is populated anywhere, and said so rather than guessing.

- `load-sets.ts:132`: `// todo 260525 lib.classSets — do we need to iterate setData to fill it here too?`
- `constants/all-classdata.ts:41` has `lib.classSets` commented out.
- `api-settype-predicates.ts:215` does `asPresent(lib.classSets)`.

If never populated: `IsClassSet`, `GetClassSets`, `GetAllClassSets` are all affected, with a hard nil-index error rather than a silent wrong answer — a different, arguably better, failure mode than #16025's, and the two should be checked together.

First task named: one grep — establish whether anything writes `lib.classSets`. If yes, close as false alarm and delete the `todo`. If no, this joins #16025 as a second instance of "a getter reading a table nothing populates," to be fixed together as one shape.

Also noted: the `todo` is dated 260525 and still stood in the tree at capture — itself a small finding that a comment recording a known-unresolved question has nothing surfacing it. Same family as the expired-carve-out class on #15999: the decision was recorded and the condition never checked.
