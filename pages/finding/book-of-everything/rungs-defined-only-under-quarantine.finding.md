---
id: e9178bd9-fdf7-5e11-9c7c-5bdac20ab45b
slug: rungs-defined-only-under-quarantine
page-type-slug: finding
title: "Rungs defined only under quarantine"
domain-slug: domain/book-of-everything
---

# Claim

The Book of Everything's live data is scored on a rung vocabulary whose only definition stands under quarantine, so a sweep of `dirty/` leaves the scores in the book uninterpretable.

# Evidence

The book is live and in active use. `~/books/book-of-everything/` holds ten numbered parts, a `DASHBOARD.md`, a `CAPTURE-LOG.md`, a `ROTATION.md` and a `profile.md` per node, and `domains/folders/book-of-everything.md` governs it with `books-path: book-of-everything/**` under `persona-champion-slug: ali`.

Its working data is keyed on rungs. Every node profile carries `D:` and `C:` in its front matter — `05-human-society/04-politics-and-government/01-political-theory/profile.md` reads `D: 3` and `C: 3.00` — and `ROTATION.md` spells the rungs out in prose: "**D2 (Student)**", "**D3 (Scholar)**", and "The D2→D3 generative threshold sits exactly on that self/liberation axis."

Nothing live defines those rungs. `grep -rniE "scholar|rung|mastery|counterfeit|generative threshold"` over `domains/` returns two hits, and both are unrelated: `personas/ali.md:11` calls Ali "a tiny Fae scholar", and `tasks/scenewright/author-persona-scene.md:34` is about sentence rhythm. The rung table stands at `dirty/code/packages-alanwalton-ali-docs-mastery-ladder.md` and the roll-up arithmetic behind `C:` at `dirty/code/packages-alanwalton-ali-docs-scoring-and-propagation.md`. Both are quarantined and queued for removal.

What I did not measure: whether the rung table is duplicated anywhere in `~/books/` itself, which would close the gap without any instruction change — I searched `domains/` and `dirty/` but did not read the books repo exhaustively. I also did not judge whether the scoring practice is still wanted. The live interviewer tasks `domains/tasks/interviewer/prepare-interview.md` and `interview-loop.md`, both `reviewed-at: 2026-08-07`, describe a different practice with no scoring in it, so the rungs may be legacy data rather than a live contract; I did not settle which, and that is the question this observation raises rather than answers.

Noticed while ingesting `dirty/docs/ali-interview-mechanics.md`, whose "three lines" section is a partial gloss on that same quarantined table and was cut.
