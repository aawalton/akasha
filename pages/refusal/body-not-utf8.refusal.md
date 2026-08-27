---
id: fa2d90ba-d4fc-50e0-abed-3923543426fb
slug: body-not-utf8
page-type-slug: refusal
title: "Body not UTF-8"
holes:
  - source
  - bytes
  - leading
---

# Refusal

`{source}` is {bytes} bytes and is not UTF-8 text. It begins `{leading}`.

This command decodes a body as UTF-8 and writes back what it decoded. Every byte that is not valid UTF-8 decodes to U+FFFD, so what landed would not be what you handed over: a PNG's leading `89` lands as `efbfbd`, and the file grows as each high byte expands. What lands that way is well-formed text, so every gate below this one passes it and nothing reports the loss.

Nothing was written. This path carries text; hand it a UTF-8 body.
