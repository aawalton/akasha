import type { TypeDeclaration } from "../../code-system/type-declarations/type-declaration.page-type.ts"

export const vscodeTypings = {
  id: "01a06977-65e5-7025-9a56-e64197ec6b72",
  pageTypeSlug: "type-declaration",
  slug: "vscode-typings",
  definition: "the editor api reached under the name a typecheck looks it up by",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The names come from the `vscode-api` declaration rather than from a copy here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The manifest around this declaration is named for what a typecheck looks up, not for its folder.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is written by hand beyond the one reference.",
    },
  ],
} as const satisfies TypeDeclaration
