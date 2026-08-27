---
id: 2077579a-9303-5175-b47e-0ec1de2bc353
page-type-slug: finding
title: "No check measures mention state"
domain-slug: page-type/reference
---

# Claim

Nothing measures mention state across the estate, so a path stranded by any route other than the `rm` door goes unreported where the same breakage in a link would not.

# Evidence

#17802 landed `[mentions]` on `tools/rm.ts` on 2026-08-04: a removal now reports the help strings, usage lines and comments left naming what is going, on the same footing as a broken link. Verified at the door — `bun tools/rm.ts tools/statusline.sh --dry-run` returns `[links] 0 would break` beside `[mentions] 7 stranded`, over 2118 files.

That is a door judgment and covers the ordinary route. It is not a standing check.

`links-resolve` is the standing instrument for the other kind, and it exists because a broken link rots where nobody is looking: it reports 2926 of 7015 links resolving across 1913 surfaces, with 4089 under quarantine. Nothing answers the same question about the 544 root-relative paths this tree spells as text in `.ts` and `.sh` — the count #17802 took when it fixed the line between the kinds.

The routes a door does not cover are a deletion taken outside `rm`, a rename taken outside `mv`, and a path that was already stranded before either door learned to look. None of the three reports anything today.

NOT MEASURED, and what a review pass should settle before cutting anything: how many mentions stand stranded right now. The instrument to take that reading is `mentionsOf` in `tools/lib/mention.ts`, which already answers where a body names a path and on which line.
