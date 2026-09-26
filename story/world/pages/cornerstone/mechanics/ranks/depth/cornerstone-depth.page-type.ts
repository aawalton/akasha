import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const cornerstoneDepth = {
  id: "01a0dee6-492c-728a-b2ed-cf137b64fbd8",
  type: "page-type/page-type",
  slug: "cornerstone-depth",
  definition: "a rung on the Depth ladder a Faculty of the Waking Stone climbs in Cornerstone",
  pluralSlug: "ranks",
  extends: ["page-type/world-rank"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung's Depth is one less than its place, so the bottom rung is Depth zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each Depth up widens a Faculty's range and sharpens its detail.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The higher Depths each add a small active capability.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ladder has six rungs and no seventh.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
