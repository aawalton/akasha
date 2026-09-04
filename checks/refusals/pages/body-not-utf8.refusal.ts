import type { Refusal } from "../refusal.page-type.ts"

export const bodyNotUtf8 = {
  id: "01a06611-3980-752b-ad7d-cba8543426fb",
  pageTypeSlug: "refusal",
  slug: "body-not-utf8",
  title: "Body not UTF-8",
  text: "`{source}` is {bytes} bytes and is not UTF-8 text. It begins `{leading}`.\n\nThis command decodes a body as UTF-8 and writes back what it decoded. Every byte that is not valid UTF-8 decodes to U+FFFD, so what landed would not be what you handed over: a PNG's leading `89` lands as `efbfbd`, and the file grows as each high byte expands. What lands that way is well-formed text, so every gate below this one passes it and nothing reports the loss.\n\nNothing was written. This path carries text; hand it a UTF-8 body.",
} as const satisfies Refusal
