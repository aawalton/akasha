---
id: e3c88a72-7595-5166-8b49-db01c13918bd
page-type-slug: refusal
title: "Statusline slots disagree"
holes:
  - renders
  - declares
---

# Refusal

tools/statusline.sh renders the slots `{renders}` where tools/lib/attributes.ts declares `{declares}`. The declaration is the original and `SEAT_RENDER` in the script is a copy of it, so the script is the side to change. The order matters as much as the list, because the script renders by position. `SEAT_RENDER` carries the project and the initiative between them, which are stored as a value rather than a slug and are not compared here.
