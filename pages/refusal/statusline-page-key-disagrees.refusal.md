---
id: 002835d8-8bb7-5112-a6c8-c97f3215b284
page-type-slug: refusal
title: "Statusline page key disagrees"
holes:
  - key
  - spelled
  - source
  - declared
---

# Refusal

`{key}` in tools/lib/seat-page-read.sh reads `{spelled}` off a seat's page, but {source} writes that value under `{declared}`, so the bash side reads a key nothing sets and finds nothing. The bash constant is the copy, so it is the side to change.
