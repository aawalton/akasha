import type { TypeDeclaration } from "../../../../../code-system/type-declarations/type-declaration.page-type.ts"

export const treeRow = {
  id: "01a07254-9a16-7f32-8d54-29daa3227516",
  pageTypeSlug: "type-declaration",
  slug: "tree-row",
  definition: "the fields every row of every tree the editor draws carries",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One name is used for one thing across every tree the editor draws.",
    },
    {
      invariantKind: "departure",
      statement: "A tree names its own row type, which takes these fields and adds its own.",
    },
    {
      invariantKind: "departure",
      statement: "A row holds its children under the type that row is.",
    },
    {
      invariantKind: "departure",
      statement: "A value that is absent is null rather than missing.",
    },
    {
      invariantKind: "departure",
      statement: "A path is whole, the service knowing the checkout the editor does not join.",
    },
    {
      invariantKind: "departure",
      statement: "A color is the name of one, the editor holding the color each name is drawn as.",
    },
  ],
} as const satisfies TypeDeclaration
