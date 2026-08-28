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

`ops checks audit page-holds-to-its-type` reports 171 pages outside their shape — 157 findings and 14 others, among them four domain pages and three check pages. That is the gate's own count, from the gate's own instrument.

Three earlier attempts at this number were wrong, and how they were wrong is the more useful record.

A regex over raw section text gave 479. It counts markdown markers and the blank lines between paragraphs; `sectionChars` at `page/document/check.ts:148-150` sums `plain(block.content).length` per block and counts neither. The overcount is roughly threefold.

A probe was then built to check that instrument, writing findings at 1,999, 2,000 and 2,005 characters and reading which were refused. They agreed exactly — because the probe bodies were unmarked prose in a single block, the one shape where the raw and plain counts coincide. The control could not fire.

A later run of that same probe passed a 20,000-character Evidence, a 5,000-character Claim and a section the shape forbids. That was a `cd` sending the writes outside the repository, where no gate runs; it is filed separately, and it was minutes from being reported as the gate having failed.

Three seats cleared their own sealed pages losing no measurement, so the bound is right. But they knew what each sentence was for; whoever holds the rest will not, and the cheapest legal act on a sealed page is deletion.
