---
id: 3eea809a-7aa1-53a1-8985-20f020dab7cc
slug: diagnostic-seat-bound-to-foreign-row
page-type-slug: finding
title: "Diagnostic seat bound to foreign row"
domain-slug: domain/agent-harness
---

# Claim

A headless seat can boot bound to a `projectSeq` naming an unrelated closed row, and the halt hook then instructs it to move that row.

# Evidence

Observed 2026-08-04 by `ryn-principle-7`, agent id `019fce32-b7ff-7db7-aaa4-5cad1accef8a`, a headless seat launched to run `define-principle-or-rule` as a diagnostic.

`ops seat whoami` reports `projectSeq=7`. `ops project show 7` reports `#7 Web UI for project management`, `status done`, `completedAt 2026-02-28T21:39:28.756Z`. There is no `projects/7.md` in the memory tree. The row has nothing to do with the seat's task, its domain or its persona, and it was closed five months before the seat existed.

At turn end both halt hooks fired — `tools/hooks/block-headless-halt.sh` and `packages/infra/scripts/block-headless-halt.sh` — with "Your project row still names YOUR act as the next one", and offered three exits, the first being `ops project move-to --seq <n> --status awaiting_<layer>_<act>`.

Following that instruction on this seat means moving a row completed in February backward off `done`. `ops project move-to --help` states that every backward move is recorded in the row's `backwardMove` attribute and that nothing clears `completedAt` once stamped, so the row would afterwards carry a rewind record and a stale completion stamp, both false about the work it names. The seat is told to do this by a hook whose refusal message offers no way to say the row is not its own.

The seat retired instead. What made the trap visible was reading the row before acting on it; a seat that took the hook's first exit on trust would have written to it.

Not measured: how the seat acquired `projectSeq=7` — whether the launcher passed it, whether 7 is a default, or whether the name `ryn-principle-7` was composed from a counter and the seq derived back out of it. No other seat's row binding was checked.
