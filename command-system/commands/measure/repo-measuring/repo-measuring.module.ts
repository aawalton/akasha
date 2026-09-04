import type { Module } from "@akasha/code-system/module"

export const repoMeasuring = {
  id: "01a05a0e-6376-7000-a013-86be99eb36e0",
  pageTypeSlug: "module",
  slug: "repo-measuring",
  definition:
    "how many files of each type the checkout holds, and how many lines those files run to",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What git holds is what is counted.",
    },
    {
      invariantKind: "departure",
      statement: "A file the repository ignores is not counted.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file not yet committed is counted where the repository does not ignore that file.",
    },
    {
      invariantKind: "departure",
      statement: "A path git names more than once is counted once.",
    },
    {
      invariantKind: "departure",
      statement:
        "A symbolic link is the one path git holds rather than the files the link reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A listing git could not answer throws rather than counting none.",
    },
    {
      invariantKind: "departure",
      statement: "A file a generated folder holds is not counted.",
    },
    {
      invariantKind: "departure",
      statement:
        "A generated folder is named `generated` or `build` or `dist` or `out` or `coverage`.",
    },
    {
      invariantKind: "departure",
      statement: "A name carrying `generated` before its extension is not counted.",
    },
    {
      invariantKind: "departure",
      statement: "A folder name is matched whole rather than as the opening of a longer name.",
    },
    {
      invariantKind: "departure",
      statement: "A file type is what follows the last dot in a name.",
    },
    {
      invariantKind: "departure",
      statement: "A name holding no dot is its own type.",
    },
    {
      invariantKind: "departure",
      statement: "A name whose only dot opens that name is its own type.",
    },
    {
      invariantKind: "departure",
      statement: "A line is counted by the newline ending that line.",
    },
    {
      invariantKind: "departure",
      statement: "A last line ending in no newline is counted.",
    },
    {
      invariantKind: "departure",
      statement: "A file that could not be read is counted with no lines.",
    },
    {
      invariantKind: "departure",
      statement: "A file that could not be read is named under the total.",
    },
    {
      invariantKind: "departure",
      statement: "Types are ordered by how many lines each type holds.",
    },
    {
      invariantKind: "absence",
      statement: "No folder is walked here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges whether a file is text.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
