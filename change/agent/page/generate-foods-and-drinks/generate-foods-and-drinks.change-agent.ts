import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const generateFoodsAndDrinks = {
  id: "01a15a11-801f-76e8-8e38-9513600136bd",
  type: "page-type/change-agent",
  slug: "generate-foods-and-drinks",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/page",
  changeTargetSubtype: "change-target-subtype/page",
  definition: "every food and drink in the item mine, one page to a distinct buff",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A food or drink is an item of the food or drink item type with buff text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Items whose buff reads the same, and that are both food or both drink, share a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hand-made page keeps its slug, its id, its hash place and its ability.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hand-made page is matched to the mined item its title names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hand-made page keeps its effects where a pinned case verifies them or the mine reads none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new page takes the next hash place, in the order of its first item's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every way a hand-made page differs from the mine is told.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 60,
  maxMemoryMb: 3072,
  createdAt: "2026-10-20T16:07:38.782Z",
  updatedAt: "2026-10-20T16:07:38.782Z",
} as const satisfies ChangeAgent
