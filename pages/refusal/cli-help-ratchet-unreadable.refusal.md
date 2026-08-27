---
id: 7633a67f-70b9-5aff-ab5c-1d12d589cde3
page-type-slug: refusal
title: "CLI help ratchet unreadable"
holes:
  - path
  - detail
---

# Refusal

`{path}` could not be read as an accepted list: {detail}

Nothing is reported over the references, because there is no accepted list to report them against. A ratchet that will not parse and a ratchet accepting nothing are the same silence at the point of reading, so the reading is refused rather than returned over whatever survived the parse.
