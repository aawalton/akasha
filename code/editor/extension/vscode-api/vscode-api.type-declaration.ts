import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const vscodeApi = {
  id: "01a0680b-7175-7001-8191-14c34a59562f",
  type: "page-type/type-declaration",
  slug: "vscode-api",
  definition: "the editor api against which an extension in this tree compiles",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The editor host injects `vscode`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file reaching `vscode` states no import.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names are declared in one ambient module block.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every name the editor hands an extension is declared here.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "This declaration restates the editor fork's own `src/vscode-dts/vscode.d.ts`.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A promote of the fork refuses while this declaration differs from the fork's copy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A copy behind the fork typechecks clean and throws at load.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here is written by hand.",
    },
  ],
} as const satisfies TypeDeclaration
