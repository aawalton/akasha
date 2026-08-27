---
id: fec6d441-1905-5b49-8918-2b201fa3e89a
page-type-slug: finding
title: "Strong edge claim dropped"
domain-slug: domain/alignment
---

# Claim

An alignment claim was dropped from the corpus and nothing picked it up. Until commit b6e00c30 on 2026-08-06 the Share An Edge aid on `domains/alignment.md` carried "one strong edge beats three weak ones" — that a layout should commit to few alignment axes rather than many. That commit traded it for the two rule-aids now in the paragraph, which stands at 192 characters against its 200 bound. No other live document binds the claim.

# Evidence

Raised by a review-instructions seat on `domains/alignment.md` (report at ~/agents/claude-alignment-archivist-review-instructions/review-alignment.md), which landed nothing on the document and handed this back because whether alignment is worth two rules at every reader's boot rests on judgment rather than on anything an instrument settles.

The reviewer reported grepping `domains/` for align, centr, edge, overhang, flush, gutter and margin and finding no other live document binding an alignment claim. It reported the 192-against-200 measurement from `document-conforms`, and `ops instructions run-gates --file-path domains/alignment.md` exiting 0.

I did not re-run the grep, did not read commit b6e00c30, and did not verify the character count myself. Nothing here measures whether the dropped claim was load-bearing for any reader.
