---
id: a2054c8b-51b0-582b-b965-a10a9d324478
page-type-slug: finding
title: "Reviewed at never written"
domain-slug: task/review-instructions
---

# Claim

`review-instructions` has no step at any of its four stages that moves `reviewed-at`, so the reading the record exists to name is the one act that never writes it.

# Evidence

`tools/document/schemas/domain.ts:130-137` defines the key as "The day this document was last read whole and judged — of the reading rather than of any edit, so a review changing nothing still moves it", and says what is measured against it is characters moved since the commit that wrote it.

`tasks/archivist/review-instructions.md` contains the string `reviewed-at` exactly once, in its own frontmatter. None of its four stages — the governing read, the slice walk, the whole-document judgment, the hand-back — names the key or moves it.

Measured on this perimeter pass: `roles/lead.md` was read whole, judged, and cut from 2518 to 1838 bytes across eight commits, and `bun tools/stale-reviews.ts` now names it as owed a reading. `personas/aura.md` and `tasks/lead/review-findings.md`, also read this pass, are likewise on that list. `git blame -L 5,5 roles/lead.md` puts the record on `89018bb9`, "record the whole perimeter as reviewed", so what every reading moves is the churn and never the anchor.

This is distinct from a same-day review being unrecordable: that is about the key's granularity, and this is about no step existing to write it on any day.
