import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const changeAgent = {
  id: "01a07e9a-630c-75a2-b4ec-5106861a8009",
  type: "page-type/page-type",
  slug: "change-agent",
  definition: "a change an agent reaches by name",
  extends: ["page-type/change"],
  parts: [
    "domain/change-agent-file",
    "domain/change-agent-file-content",
    "domain/change-agent-folder",
    "domain/change-agent-page-property",
    "domain/change-agent-page-type",
    "domain/change-agent-prose",
  ],
  properties: [
    { pageProperty: "number-property/change-max-cpu-seconds", required: true, many: false },
    { pageProperty: "number-property/change-max-memory-mb", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent change is reached by name rather than by another change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent change reaches the mechanical changes working its bodies out.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  loadedExport: ["runChange", "takes"],
} as const satisfies PageType
