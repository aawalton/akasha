---
id: 968caeae-9ba9-562f-b2cb-11013bc6b19e
page-type-slug: finding
title: "Cut range swallows neighbour"
domain-slug: domain/global
---

# Claim

The `ingest-instructions` loop says which line to take and never where the cut's range may end. Markdown puts undecided neighbours on lines contiguous with the block being cut — a paragraph abutting the next `##` heading, bullets with no blank line between. A range one line too wide removes that neighbour with no verdict and no commit naming it, and nothing detects it: a line cut with a verdict and one that vanished under a neighbour's edit leave the same file behind.

# Evidence

Met on my own run, 2026-08-07, emptying `dirty/code/packages-agents-instructions-docs-findings.md`.

Cutting the block `## The basis — what produced the claim` (lines 148-166), I printed the neighbours first and found line 147 — the closing paragraph of the still-undecided block above, `## Adopting clusters in another domain` — abutting the heading at 148 with **no blank line between them**:

    147  **Nothing about a finding's life changed.** The same four exits, …
    148  ## The basis — what produced the claim

A range of 147-166, which is the natural one to reach for when a section is preceded by prose, would have removed an undecided block's last paragraph silently. I avoided it only because I was printing neighbours before every cut with a helper of my own, not because anything told me to.

What the task says nearest the hazard is about ORDER, not about the range's boundary: "Cutting upward leaves every line above it where it was, so nothing you have already read moves under you." That is true and does not bound the edit.

Nothing downstream catches it. `ops instructions edit` requires a UNIQUE match, which refuses a wrong string but accepts a correct string that is one line too long. Across fourteen cuts on two sources the door printed the same twelve gates every time — hook-liveness, repo-agrees, read-before-write, hold-seat, read-what-governs, read-the-schema, document-conforms, domain-slug-stem, domain-slug-unique, links-resolve, token-ceiling, typecheck — and none reads the removed span against the block the seat said it was deciding.

NOT ESTABLISHED: how often this has fired. A seat that catches it and restores the line from the removing commit's parent leaves the final tree correct, so the corpus cannot be swept for it; and the failure's whole shape is that an uncaught one is invisible. My dispatcher reports one such near-miss on another tree. Around forty seats are running this task concurrently.
