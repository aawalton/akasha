import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperPackageTypecheck = {
  id: "01a061f6-390b-72a7-97b3-528d057fbbf4",
  type: "command",
  slug: "temper-package-typecheck",
  definition:
    "the command typechecking a package under `temper/` against its own compiler settings",
  code: "ts",
  taking: [
    {
      said: "--package <name>",
      takes: "a folder under `temper/` to typecheck, repeated to name several",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A package is typechecked against its own compiler settings rather than the workspace's.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run naming no package typechecks every folder under `temper/` carrying a `tsconfig.json`.",
    },
    {
      invariantKind: "departure",
      statement: "Packages are typechecked in name order.",
    },
    {
      invariantKind: "departure",
      statement: "The count of files read is reported beside the count of errors found.",
    },
    {
      invariantKind: "departure",
      statement: "A package whose compiler read no file of its own is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Every package named is run.",
    },
    {
      invariantKind: "departure",
      statement: "A package that fails leaves the later packages still typechecked.",
    },
    {
      invariantKind: "departure",
      statement: "The compiler writes no output file.",
    },
  ],
  name: "package-typecheck",
} as const satisfies Command
