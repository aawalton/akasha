---
page-type-slug: finding
title: "Restoring a shape check seals the corpus it was stood down for"
domain-slug: domain/checks-system
---

# Claim

Restoring a shape check over a corpus that grew while it was stood down freezes every page already outside the shape. The gate refuses the whole write, not the part changed, so such a page can be removed or rewritten whole but never amended. 157 findings and 14 other pages are in that state. The seat that restored the check did not measure this first, and its next three attempts to measure it were each wrong in a different way.

# Evidence

Measured 2026-08-28 by seat astra, after restoring `page-holds-to-its-type` at `c0316d111`.

`pages/page-body-shape/finding.page-body-shape.md` bounds a finding's `# Claim` at 500 characters and `# Evidence` at 2000. The refusal is not scoped to the section being changed: a one-character correction to a conforming section is refused because a different section is over.

`ops checks audit page-holds-to-its-type` reported 171 pages outside their shape at `0a2d75a11` — 157 findings and 14 others, among them four domain pages and three check pages. A second seat ran the same audit minutes later and got 161. Both readings are right: reshaping was trimming pages while each audit ran. The honest form is about 160 and falling. A count of this corpus is a reading with a commit attached, never a fact.

Three earlier attempts at this number were wrong. How they were wrong is filed as `a-control-built-to-check-an-instrument-shares-its-blind-spot` and `a-cd-sends-every-later-write-outside-the-gates`.

The first gave 479, from a regex over raw section text. `sectionChars` at `page/document/check.ts:148-150` sums `plain(block.content).length` per block, stripping markdown and counting no separator between blocks. The per-page gap is small — 5 to 10% on a dense finding — but this corpus piles up just above the bound, so a small measurement error moves the count nearly threefold. The error worth learning from is the count, not the measure.

Three seats cleared their own sealed pages losing no measurement, so the bound is right. But they knew what each sentence was for; whoever holds the rest will not, and the cheapest legal act on a sealed page is deletion.
