import type { SyntaxRule } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.types.ts"

export const commandExportNamedForItsSlug = {
  id: "01a0945b-4372-7098-9be8-b0c6a08d0366",
  type: "syntax-rule",
  slug: "command-export-named-for-its-slug",
  definition: "the rule refusing a command's code that exports no name that command's slug spells",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command's slug is the stem that command's code file is named with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which name a file exports under a slug is read from `export-spelling`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The line named for a name the file exports nowhere is that file's first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the file holding a command's code is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file outside `command/pages` is refused nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A name built as the code runs is not seen.",
    },
  ],
} as const satisfies SyntaxRule
