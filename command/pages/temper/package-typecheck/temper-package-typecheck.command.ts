import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperPackageTypecheck = {
  id: "01a061f6-390b-72a7-97b3-528d057fbbf4",
  type: "command",
  slug: "temper-package-typecheck",
  definition:
    "the command typechecking a package under `temper/` against its own compiler settings",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A package is typechecked against its own compiler settings rather than the workspace's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run naming no package typechecks every folder under `temper/` carrying a `tsconfig.json`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Packages are typechecked in name order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The count of files read is reported beside the count of errors found.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A package whose compiler read no file of its own is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every package named is run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A package that fails leaves the later packages still typechecked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The compiler writes no output file.",
    },
  ],
  name: "package-typecheck",
  arguments: [
    { argument: "argument/code-root" },
    { argument: "argument/package-name", repeats: true },
  ],
} as const satisfies Command
