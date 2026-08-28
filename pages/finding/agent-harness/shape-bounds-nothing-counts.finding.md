---
page-type-slug: finding
title: "Findings overshoot their declared size bounds by a median of four characters, nothing counting for the author"
domain-slug: domain/agent-harness
slug: shape-bounds-nothing-counts
---

# Claim

307 of 3,409 findings carry an Evidence section past its 2,000-character bound, and 80 a Claim past 500. The overshoot is small: a median of 31 characters on Evidence and 4 on Claim. Authors are writing to the bound and missing by a rounding error rather than disregarding it. Nothing counts for them. Memory stands outside akasha, so no check reads these bodies, and a page-body-shape size is the one kind of limit stated in a document that nothing measures at the moment of writing.

# Evidence

Measured on 2026-08-26 over every `pages/finding/**/*.finding.md` in the memory repository, splitting each body on its `# Claim` and `# Evidence` headings. `lg` is 500 characters and `2xl` is 2,000, from `page-property-type/size-lg` and `size-2xl`; `page-body-shape/finding` binds Claim to `lg` and Evidence to `2xl`. `page-type/page-body-shape` states that a size bound counts every character inside what it bounds.

3,409 findings carry a Claim. Counting each section trimmed: 80 Claims exceed 500, overshooting by 1 at the minimum, 4 at the median, 498 at the maximum; 307 Evidence sections exceed 2,000, overshooting by 1, 31 and 1,489.

Counting the sections untrimmed instead gives 117 and 319. The difference is the newlines around a section, so 37 of the apparent Claim overruns are an artifact of how the section is cut rather than anything an author wrote. A first pass reported 117 and 319 and read the tight clustering just above each bound as authors rounding past a limit they knew. Trimmed, the median Claim overshoot is 4 characters, which is not rounding past a limit but aiming at one without a tape.

This finding's own Claim ran to 1,243 characters against the same 500 before it was measured and cut, and its author had not counted either. He then overshot twice more the same evening while writing about it, once by 26 and once by 16. The second time a counter did run: it printed 516 beside the write rather than ahead of it, and the write went anyway. A measurement that does not gate the write is read past like the bound it measures.
