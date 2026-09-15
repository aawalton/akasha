import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperPackageTypecheck = {
  id: "01a061f6-390b-72a7-97b3-528d057fbbf4",
  type: "page-type/command",
  slug: "temper-package-typecheck",
  definition:
    "the command typechecking a package under `temper/` against its own compiler settings",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A package is typechecked against its own compiler settings rather than the workspace's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run naming no package typechecks every folder under `temper/` carrying a `tsconfig.json`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Packages are typechecked in name order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The count of files read is reported beside the count of errors found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A package whose compiler read no file of its own is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every package named is run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A package that fails leaves the later packages still typechecked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The compiler writes no output file.",
    },
  ],
  name: "package-typecheck",
  arguments: [
    { argument: "argument/code-root" },
    { argument: "argument/package-name", repeats: true },
  ],
} as const satisfies Command
