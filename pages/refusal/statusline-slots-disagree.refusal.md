---
id: e3c88a72-7595-5166-8b49-db01c13918bd
slug: statusline-slots-disagree
page-type-slug: refusal
title: "Statusline slots disagree"
holes:
  - renders
  - declares
---

# Refusal

The statusline renders the slots `{renders}` where tools/lib/attributes.ts declares `{declares}`, sorted, so the two do not name the same slots. Every attribute a seat states is rendered and nothing else is. The declaration is the original and `SEAT_RENDER` in the script is a copy of it, so the script is the side to change.

The order is not compared. The script turns each slot into `<slot>-slug` and asks the reader for it by name, so where a slot stands on the line only decides where it prints, and the line is ordered for what changes least rather than to match the declaration. An assignment stored as a value rather than a slug is not compared here.
