import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const addonKeybindsDeclarations = {
  id: "01a06259-bfbc-7d5e-8b4b-5bbe42c3459a",
  type: "page-type/type-declaration",
  slug: "addon-keybinds-declarations",
  definition: "the game names and list shapes this add-on reaches without importing them",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the names the code here reaches are declared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name more than one package reaches is declared in the shared game types.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A compiler emits nothing from this file.",
    },
  ],
} as const satisfies TypeDeclaration
