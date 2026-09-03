import type { TypeDeclaration } from "../../code-system/type-declarations/type-declaration.page-type.ts"

export const vscodeApi = {
  id: "01a0680b-7175-7001-8191-14c34a59562f",
  pageTypeSlug: "type-declaration",
  slug: "vscode-api",
  definition: "the editor api an extension in this tree compiles against",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The editor host injects `vscode`, so a file reaching it states no import.",
    },
    {
      invariantKind: "departure",
      statement: "The names are declared in one ambient module block.",
    },
    {
      invariantKind: "departure",
      statement: "Every name the editor hands an extension is declared here.",
    },
    {
      invariantKind: "stopgap",
      statement: "This restates the editor fork's own `src/vscode-dts/vscode.d.ts`.",
    },
    {
      invariantKind: "constraint",
      statement: "A promote of the fork refuses while this differs from the fork's copy.",
    },
    {
      invariantKind: "departure",
      statement: "A copy behind the fork typechecks clean and throws at load.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is written by hand.",
    },
  ],
} as const satisfies TypeDeclaration
