import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const inferenceHook = {
  id: "01a00688-389f-7000-ba53-42d361243e1c",
  type: "page-type/page-type",
  slug: "inference-hook",
  definition: "an agent hook that uses a model",
  extends: ["page-type/agent-hook"],
  parts: ["file-property/stop-gates", "inference-hook/keep-alan-directives"],
  properties: [
    {
      pageProperty: "file-property/stop-gates",
      required: false,
      many: false,
      uncommitted: true,
      default: "jsonl",
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A hook here records how far each of its runs got, beside its own page.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
