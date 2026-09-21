import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const addonMenuEsoWindow = {
  id: "01a06100-0000-7000-8000-000000000031",
  type: "page-type/type-declaration",
  slug: "addon-menu-eso-window",
  definition: "the game settings window, scene and dialog names the panel reaches",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name here keeps the spelling the game gives that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name the shared game types already declare is left out.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A compiler emits nothing from this file.",
    },
  ],
} as const satisfies TypeDeclaration
