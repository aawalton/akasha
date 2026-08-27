---
id: c2334755-a291-5389-9d72-a639b36a6f71
page-type-slug: finding
title: "Recovery rate check defects"
domain-slug: domain/global
---

# Claim

`check-recovery-rate-notes-coverage` cannot fail on the corpus it guards: its case-insensitive substring match lets prose about any part of Alan's life satisfy all five `RECOVERY_RATES` tokens — two planted sentences about a podcast and sleep-breathing certify all five — and separately it cannot run in CI at all, since pipeline 27399 hit `ENOENT` on `/tmp/books/...` because CI pods set `HOME=/tmp` and mount no books checkout.

# Evidence

Project #18175 (status `awaiting_worker_seat`, `live-on: deploy`, domain `code-check`, initiative `code-check`). Objectives: (1) the gate reads notes in a CI pod — pipeline 27399 logged `ENOENT` on `/tmp/books/...`, CI pods set `HOME=/tmp` and mount no books checkout; (2) a rate is credited only where notes document the activity, not merely contain a rate token's letters; (3) its refusal states the population its verdict covers — a failure should say how many of the five tokens it checked (`f83559298` backed this out while CI could not run the check at all); (4) the header states which half of the defect cannot dispatch it — a note deleted under a standing rate cannot fire this gate, only a rate added without notes can; (5) every CI-run reader of the books repo is named — callers of `booksRoot()`, with what each does when the path is absent (`ops enforcement list --grep books` returns no mechanisms today).

`check-recovery-rate-notes-coverage` asks, of each of five tokens in `RECOVERY_RATES`, whether `all-about-alan/notes/recovery-rates.md` under `booksRoot()` holds it as a case-insensitive substring. It protects Alan's ledger: `RECOVERY_RATES` generates `RECOVERY_MULTIPLIER_EXPRESSION`, hand-written into the live `recoveryMultiplier` property at `apply-stress-capacity-recovery.script.ts:173`, so an undocumented rate credits capacity-hours on every matching session. Founding defect: `Pod` credited 3 capacity-hours/hour while Alan's notes named the activity nowhere.

KEEP: sole mechanism (`ops enforcement list --grep recovery`); against a corpus documenting four of five activities it exits 1 and names the gap; empty/absent files exit 2. Cost: 0.049% of step-seconds, predicate 4.2 µs. Values (whether a rate's number is right) stay out of scope.

Opened standalone at `someday_maybe` from the CI failure in #18166; the check audit reached it 2026-08-10 and settled REPAIR. Stays standalone: the repair spans a CI pod spec and a predicate, reaching production on its own deploy.
