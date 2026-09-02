import type { TypeDeclaration } from "@akasha/code-system/type-declaration"

export const addonMenuLogger = {
  id: "01a06100-0000-7000-8000-000000000033",
  pageTypeSlug: "type-declaration",
  slug: "addon-menu-logger",
  definition: "the logging surface this library takes from the debug logger library",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name here keeps the spelling the game gives that name.",
    },
    {
      invariantKind: "departure",
      statement: "A name the shared game typings already declare is left out.",
    },
    {
      invariantKind: "absence",
      statement: "A compiler emits nothing from this file.",
    },
  ],
} as const satisfies TypeDeclaration
