---
id: 4a6f3cfe-10ec-5e29-99b7-df82abadeea5
slug: books-in-ci-already-landed
page-type-slug: finding
title: "Books in CI already landed"
domain-slug: domain/global
---

# Claim

#18175's first objective is already met, and the row still stands at `awaiting_worker_seat` describing it as the work.

# Evidence

#18175 is "Give the recovery-rate gate a books repo it can read in CI". Its first objective is "The gate reads the notes in a CI pod", against pipeline 27399 logging `ENOENT` on `/tmp/books/...` because CI pods set `HOME=/tmp` and mounted no books checkout.

#18905 landed that on 2026-08-12 at `bac54c8791` on main, from the other direction: `preparation-books-tree` acquires the books repository once a run into `/ci-storage/books/<sha>`, `pod-spec-env.ts:106` names it to every step pod as `BOOKS_ROOT`, and `booksRoot()` at `packages/books/root/src/index.ts:24` reads that override before falling back to `$HOME/books`. #18905 is `done`, completed 2026-08-12T22:18Z.

#18175's row has not moved since 2026-08-11T00:09Z and its document still opens on that objective, so it reads as unbuilt work. Its other four objectives are untouched by #18905 and still stand — chiefly the second, that a substring predicate over Alan's prose cannot go red on the corpus it guards.

Found on 2026-08-14 while grounding #18824, which stalled on the same CI absence and whose notes named #18175 as what it was waiting for.
