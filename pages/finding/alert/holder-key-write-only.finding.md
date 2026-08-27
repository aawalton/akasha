---
id: b8437634-5efb-59c0-bb45-55b8cc620f03
page-type-slug: finding
title: "Holder key write only"
domain-slug: page-type/alert
---

# Claim

The holder key on an alert document is write-only. The schema requires exactly one of `person:` or `persona:` on every document under `domains/alerts/`, and a check enforces it, but no code reads either key back when an alert fires. What a document declares about who an alert reaches and where a firing actually goes are settled independently, so the two can disagree with nothing reporting it.

# Evidence

Reported by the reviewer seat `claude-alert-archivist-review-instructions` in its line-by-line reading of `domains/alert.md` on 2026-08-13; its report is at `~/agents/claude-alert-archivist-review-instructions/review-alert.md`.

I did not search the code repository for a reader of `person:` or `persona:` myself; the absence is taken from that seat's report rather than measured here, and an absence found by search is the claim most sensitive to how narrowly the search was drawn.
