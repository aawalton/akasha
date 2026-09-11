import type { TypeDeclaration } from "akasha/code-system/type-declarations/type-declaration.page-type.types.ts"

export const vscodeTypingsEntry = {
  id: "01a06977-65e5-7025-9a56-e64197ec6b72",
  pageTypeSlug: "type-declaration",
  type: "type-declaration",
  slug: "vscode-typings-entry",
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
        "This declaration's manifest is named for the name a typecheck looks up rather than for its folder.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is written by hand beyond the one reference.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reference path is read against the file's real folder rather than against the link.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest's types field is read against the installed link instead.",
    },
  ],
} as const satisfies TypeDeclaration
