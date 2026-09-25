import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const fileProperty = {
  id: "01a04dff-9d7d-7487-9a08-2485e897542f",
  type: "page-type/page-type",
  slug: "file-property",
  definition: "a page property held in its own file",
  icon: "paperclip",
  parts: [
    "boolean-property/append-only",
    "boolean-property/generated",
    "boolean-property/tool-resolves-paths",
    "number-property/kept-for-hours",
    "relation-property/file-written-by",
    "text-property/extensions",
    "text-property/file-name",
  ],
  extends: ["page-type/page-property"],
  properties: [
    { pageProperty: "text-property/file-name", required: false, many: false },
    { pageProperty: "boolean-property/generated", required: false, many: false },
    { pageProperty: "boolean-property/runs-file-length", required: false, many: false },
    { pageProperty: "boolean-property/holds-bytes", required: false, many: false },
    { pageProperty: "boolean-property/tool-resolves-paths", required: false, many: false },
    { pageProperty: "relation-property/file-written-by", required: false, many: false },
    { pageProperty: "text-property/extensions", required: true, many: true, maxCount: null },
    { pageProperty: "boolean-property/append-only", required: false, many: false },
    { pageProperty: "number-property/kept-for-hours", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file property's value is beside its page rather than in the page's own file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file property's value goes when its page goes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file a file property's value names goes when that value goes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file property's value is loaded only where that value is asked for by name.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No gate reading a page as prose reaches a file property's value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The page claiming a file is read from that file's own name against the page types' declarations.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file landing through a change is listed by the settle that works its page's claims out again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file written or taken away outside a change reaches the listing at the next settle over its page.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A file property's badge reads as the property's name rather than its extension.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file property's badge opens the file beside its page.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
