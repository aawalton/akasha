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
    "calendar-date-property/eso-day",
    "file-property/image-bytes",
    "module/picture-landing",
    "relation-property/image-persona",
    "number-property/inference-seed",
    "number-property/inference-steps",
    "number-property/inference-guidance",
    "number-property/inference-width",
    "number-property/inference-height",
    "number-property/inference-quantize",
    "number-property/upscale-softness",
    "text-property/upscale-resolution",
    "relation-property/input-image",
    "multi-relation-property/reference-images",
    "text-property/service-versions",
  ],
  properties: [
    {
      pageProperty: "file-property/image-bytes",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pageProperty: "relation-property/image-persona", required: false, many: false },
    { pageProperty: "relation-property/relationship-level", required: false, many: false },
    { pageProperty: "calendar-date-property/eso-day", required: false, many: false },
    { pageProperty: "text-property/inference-service", required: false, many: false },
    { pageProperty: "text-property/inference-operation", required: false, many: false },
    { pageProperty: "text-property/inference-model", required: false, many: false },
    { pageProperty: "number-property/inference-seed", required: false, many: false },
    { pageProperty: "number-property/inference-steps", required: false, many: false },
    { pageProperty: "number-property/inference-guidance", required: false, many: false },
    { pageProperty: "number-property/inference-width", required: false, many: false },
    { pageProperty: "number-property/inference-height", required: false, many: false },
    { pageProperty: "number-property/inference-quantize", required: false, many: false },
    { pageProperty: "number-property/upscale-softness", required: false, many: false },
    { pageProperty: "text-property/upscale-resolution", required: false, many: false },
    { pageProperty: "relation-property/input-image", required: false, many: false },
    {
      pageProperty: "multi-relation-property/reference-images",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/service-versions", required: false, many: true, maxCount: null },
    { pageProperty: "text-property/prompt", required: false, many: false },
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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An image states the service, the operation, the model and the request that made it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image made from other images names those images rather than their paths.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image made from bytes no image page has states no input image.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image made by several runs states the earliest run.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No image states the host, the command line, a path, a time or a status.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
