---
id: 4ae26626-edde-55b5-8870-daa1340efd37
page-type-slug: finding
title: "Whether solve is a no-op on an already-solved puzzle cannot be tested without writing Alan's practice record"
domain-slug: domain/ops-chess-puzzle
---

# Claim

Whether `ops chess-puzzle solve` is a no-op on an already-solved puzzle cannot be tested without writing into Alan's practice record. No stored puzzle carries `solved` true — the count is 0 — and marking one writes a point that the `erin-chess-points` worker reconciles off the row. It is the one clause of this namespace's corpus judged by reading rather than by running.

# Evidence

Noted during the review-instructions reading of `domains/ops-chess-puzzle.md` on 2026-08-19. What was run instead: `solve zzzNOPE`, which answered `not-found` at exit 2, and `sync --limit 5` twice, which answered `upserted 5` both times against a row count of 5000 before and after.

Measured: the solved count of 0, and the idempotency of `sync`. Not measured: the behaviour of `solve` on a solved row, which is the gap this records.
