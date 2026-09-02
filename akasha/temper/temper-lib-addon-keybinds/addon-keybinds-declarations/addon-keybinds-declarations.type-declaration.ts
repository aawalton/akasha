import type { TypeDeclaration } from "@akasha/code-system/type-declaration"

export const addonKeybindsDeclarations = {
  id: "01a06259-bfbc-7d5e-8b4b-5bbe42c3459a",
  pageTypeSlug: "type-declaration",
  slug: "addon-keybinds-declarations",
  definition: "the game names and list shapes this add-on reaches without importing them",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only the names the code here reaches are declared.",
    },
    {
      invariantKind: "departure",
      statement: "A name more than one package reaches is declared in the shared game typings.",
    },
    {
      invariantKind: "absence",
      statement: "A compiler emits nothing from this file.",
    },
  ],
} as const satisfies TypeDeclaration
