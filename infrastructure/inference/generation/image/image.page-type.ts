import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const image = {
  id: "019f14c3-27e4-7b72-bc0c-6e12bbd8577a",
  type: "page-type/page-type",
  slug: "image",
  definition: "a picture akasha has",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "image" },
    { partOfSpeech: "part-of-speech/noun", spelling: "images" },
  ],
  extends: ["page-type/page"],
  parts: [
    "file-property/image-bytes",
    "module/picture-landing",
    "relation-property/image-persona",
    "text-property/eso-day",
  ],
  properties: [
    {
      pageProperty: "file-property/image-bytes",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pageProperty: "relation-property/image-persona", required: false, many: false },
    { pageProperty: "number-property/relationship-level", required: false, many: false },
    { pageProperty: "text-property/eso-day", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An image carries its own bytes rather than a note of where those bytes are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page with no bytes beside it is no image.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An image's slug is `image-` and the first sixteen hex of the sha256 of its bytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two pictures of the same bytes are one image.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run that made an image records the sha256 of the bytes, which the slug opens with.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
