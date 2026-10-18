import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const craftingBlueprintLayout = {
  id: "01a061c7-e8bf-7fc9-acb8-3f819b78d2e8",
  type: "page-type/eso-interface",
  slug: "crafting-blueprint-layout",
  definition: "the furnishing-blueprint window and its list",
  markup: "xml",
  loadedAs: "XML/UI/CraftingBlueprint.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The hide toggles are left-aligned, so their boxes line up.",
    },
  ],
  createdAt: "2026-09-02T11:01:26.335Z",
  updatedAt: "2026-10-18T19:59:13.850Z",
} as const satisfies EsoInterface
