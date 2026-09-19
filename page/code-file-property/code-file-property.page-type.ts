import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const codeFileProperty = {
  id: "01a0877d-0474-7e0b-9ce4-b84e15eed4ed",
  type: "page-type/page-type",
  slug: "code-file-property",
  definition: "a page property held in a file something runs",
  parts: [
    "number-property/max-cpu-seconds",
    "number-property/max-memory-mb",
    "number-property/max-wall-seconds",
    "text-property/fixed-export",
  ],
  extends: ["page-type/file-property"],
  properties: [
    { pageProperty: "number-property/max-cpu-seconds", required: false, many: false },
    { pageProperty: "number-property/max-wall-seconds", required: false, many: false },
    { pageProperty: "number-property/max-memory-mb", required: false, many: false },
    { pageProperty: "text-property/fixed-export", required: false, many: true, maxCount: null },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property stating no ceiling holds no run.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "A run of a code file property's file is stopped at the ceilings that property states.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
