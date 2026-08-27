---
id: f6bb8a35-9445-500a-a2f3-9fb81b0eb4f5
page-type-slug: finding
title: "Hold outlives an early exit"
domain-slug: domain/global
---

# Claim

The hold `domains/tasks/lead/define-project.md` takes in stage 1's first bullet is released only in stage 3's last, so a run ending early at "the work does not need doing" never reaches the release.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `domains/tasks/lead/define-project.md` dispatched from `review-documents`. The reading reported rather than repaired it, having measured the cost as nothing today.

Stage 1's first bullet takes the hold. Stage 3's last releases it. Stage 1 also carries the early exit — "A project nobody needs is cheapest to close" — and a run taking it never reaches stage 3.

What it costs today: `ops project census --state being-defined` reports in-state=0 over 169 scanned. That arm and `ops project list` both exclude closed rows, so a held row on a closed project is invisible to both rather than merely absent.

The same reading repaired the invariant sitting beside this, at line 36, which had read "This run ends where the dispatch begins, and moves no status" — false against this document's own early-exit line, since closing is a status move with no other spelling.

Not measured: whether any run has ever exited early with the hold taken, or whether a held row on a closed project has any reader at all. The census figure is one reading on one day and says nothing about the population over time.
