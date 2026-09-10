import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const generationLog = {
  id: "01a01d18-306b-7000-9796-b41f285a1bad",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "generation-log",
  definition: "the record kept of what one set of model services has made",
  pluralSlug: "generation-logs",
  extends: ["page-type/page"],
  parts: [
    "file-property/generation-audios",
    "file-property/generation-images",
    "file-property/generation-runs",
  ],
  properties: [
    { pageProperty: "file-property/generation-runs", required: true, many: false },
    { pageProperty: "file-property/generation-images", required: false, many: false },
    { pageProperty: "file-property/generation-audios", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A generation log has its runs and their outputs beside the log rather than in pages of their own.",
    },
    {
      invariantKind: "departure",
      statement: "A log is reached by the slug the inference commands are pointed at.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing lands a row.",
    },
    {
      invariantKind: "gap",
      statement: "The log reaches only as far as its last hand-written line.",
    },
  ],
  types: "ts",
} as const satisfies PageType
