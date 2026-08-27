---
id: cc8d57ed-82d3-5442-b720-37795921fbeb
page-type-slug: finding
title: "Projector preflight verdict flipped"
domain-slug: page-type/seat
---

# Claim

The projector's pre-flight gave two opposite verdicts 28 minutes apart over inputs that are not known to have moved: it passed and reported its five axis counts at 16:12, and refused on four undeleted rows holding `role=researcher` at 16:40.

# Evidence

Measured 2026-08-06 while landing #17987, which renamed the command to `ops seat project-seat`.

At 16:12, `bun ops seat project-seat --dry-run` in the project worktree at `edb73c7982` printed `role 14`, `domain 229`, `persona 41`, `task 30`, `mode 2`, `rules 6` and `applied false — no row was written`. No pre-flight refusal.

At 16:40, the same command against `~/code` at the landed `ebe8f4e509` exited 2 with `role=researcher on 4 undeleted row(s): 019fd271-f410-72ec-ac75-fdb72aabc486, 019fd271-f894-76da-bf18-9a0025275792, 019fd3f5-206d-767f-92b6-97e92dbe3d8a, 019fd427-6c3d-7f4f-9279-7669e559bbc7`. Repeated twice, both times refusing before any axis count is printed.

What did not change across that span. `git diff edb73c7982^..origin/main` over `role-corpus.ts`, `agent-role-vocabulary.ts` and `agent-coherence.ts` is three lines, all prose. The #17987 diff over the verb module is nine lines, every one a doc comment, a help string, an example or a symbol name. `domains/roles/` has not changed since 10:40, and `researcher.md` moved under retired at 10:18, six hours before either run. All four row ids are uuid7-ordered earlier than the seat that measured this, so all four predate both runs.

The refusal reads as row state, but no row-writing act is visible between the two readings — and the count the passing run reported was 14 against a corpus of 13 role files, one more than the corpus holds, which is what `widenedBy` would produce if it were reached.

`widenedBy` was exported at that time with six passing tests and no production caller. That explains the 16:40 refusal and not the 16:12 pass.

Not measured: whether the four rows were written, undeleted or re-keyed between the readings. No instrument to hand reads an agent row's history by id.
