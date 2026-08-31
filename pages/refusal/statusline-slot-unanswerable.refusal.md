---
id: c04a2e68-455f-5fe2-b532-019025511610
slug: statusline-slot-unanswerable
page-type-slug: refusal
title: "Statusline slot unanswerable"
holes:
  - slot
  - key
  - reader
---

# Refusal

`SEAT_RENDER` in the statusline renders the slot `{slot}`, which it asks for as `{key}`, and `{reader}` states no such key. A key the reader does not carry is not an error there: it answers with an empty line, the statusline drops the empty line, and the slot goes quietly missing from every prompt. `STATED` in the reader is the list of keys that can be answered, so either add `{key}` to it or stop rendering `{slot}`.
