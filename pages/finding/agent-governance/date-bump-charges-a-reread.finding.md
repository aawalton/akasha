---
id: ea71364e-52b4-52f2-9f89-267c3a79dc02
slug: date-bump-charges-a-reread
page-type-slug: finding
title: "Date bump charges a reread"
domain-slug: domain/global
---

# Claim

Moving a `reviewed-at:` date costs every live seat governed by that document a full re-read. The hold-seat gate refuses everything but Read, Grep and Glob when a governing document has changed since the seat read it, and it triggers on any change, a one-line date bump included. Measured three times in one pass: a seat holding `domains/role.md` was refused until it re-read all 105 lines, though the only change was `reviewed-at: 2026-08-05` to `2026-08-07`.

# Evidence

Measured on 2026-08-07 by the seat running review-documents over the 59 documents `stale-reviews.ts` named. Three holds fired on it during the pass, each from a reviewer editing one of its own governing documents: after 7954b3bf cut a sentence from `domains/global.md`, after 1694a2ac moved `reviewed-at` on `domains/persona.md`, and after 8e3411d1 moved `reviewed-at` on `domains/role.md`. The refusal names the document, the timestamps on both sides, and the line count owed.

Two of the three were date-only bumps carrying no change to any claim.

The cost compounds with the review loop itself: `pages/finding/review-documents/nothing-writes-the-record.finding.md` records that nothing writes the key, so recording a reading is a hand edit — and every such edit charges a re-read to each live seat below the document. The dispatching seat's next act was refused rather than lost each time, and re-issued after the re-read.

Not measured: how many seats were live under those documents at the time, or whether the gate could distinguish a frontmatter-only change from one touching a claim.
