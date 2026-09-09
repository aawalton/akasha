import type { Module } from "@akasha/code/module"

export const fileArguing = {
  id: "01a07bd4-e969-7d84-be28-cfc9777fb405",
  pageTypeSlug: "module",
  type: "module",
  slug: "file-arguing",
  definition: "the files a command line names, and the body each file is left with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file to write is named at `--file-path`.",
    },
    {
      invariantKind: "departure",
      statement: "The body for that file is read from the file `--content-file` names.",
    },
    {
      invariantKind: "departure",
      statement: "A `--file-path` that no `--content-file` closes is given the body piped in.",
    },
    {
      invariantKind: "departure",
      statement: "A second `--file-path` opening before the first is closed is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A `--content-file` following no `--file-path` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path named at `--remove` is left with no body at all.",
    },
    {
      invariantKind: "departure",
      statement: "A path `--remove` names that no commit and no working tree holds is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside a path taken away is taken away with that path.",
    },
    {
      invariantKind: "departure",
      statement: "A path named more than once by one call is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path both written and taken away by one call is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path outside the repository is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path the repository bars is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body piped in that opens a line with the payload marker is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not text refuses the call rather than being carried on.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no file to write and no path to take away is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The readings the writer owes are answered as faults of the call.",
    },
    {
      invariantKind: "departure",
      statement: "A commit message is read from the command line or worked out from the paths.",
    },
    {
      invariantKind: "departure",
      statement: "`--restated` names the change kind a restatement lands under.",
    },
    {
      invariantKind: "departure",
      statement: "A change kind no page here declares refuses the call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here lands or commits.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges a body.",
    },
  ],
} as const satisfies Module
