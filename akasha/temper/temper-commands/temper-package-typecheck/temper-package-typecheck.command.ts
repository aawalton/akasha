import type { Command } from "@akasha/command-system/command"

export const temperPackageTypecheck = {
  id: "01a061f6-390b-72a7-97b3-528d057fbbf4",
  pageTypeSlug: "command",
  slug: "temper-package-typecheck",
  definition:
    "the command typechecking a package under `temper/` against its own compiler settings",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--package <name>",
      takes: "a folder under `temper/` to typecheck, repeated to name several",
    },
  ],
  helpNotes: [
    "a package's own `tsconfig.json` is the only statement of what it compiles, so the compiler runs once per package rather than once over the workspace.",
    "naming no package typechecks every folder under `temper/` that carries a `tsconfig.json`.",
    "the answer says how many files the compiler read beside how many errors it found, because nothing read and nothing wrong read alike.",
    "a package whose compiler read none of its own files is named, since a config compiling nothing reports success over nothing.",
    "the packages are taken in name order and every one is run, so one failure does not hide the rest.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A package is typechecked against its own compiler settings rather than the workspace's.",
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
} as const satisfies Command
