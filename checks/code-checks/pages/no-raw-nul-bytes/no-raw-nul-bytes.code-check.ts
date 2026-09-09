import type { CodeCheck } from "../../code-check.page-type.ts"

export const noRawNulBytes = {
  id: "01a04bc8-6c71-7973-85d5-6d17ea5fea65",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "no-raw-nul-bytes",
  definition: "the check refusing a file with a raw NUL byte",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every file no property declares as bytes is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A body a file property declares as bytes is let through.",
    },
    {
      invariantKind: "departure",
      statement: "A property naming its file is read from the file's own name.",
    },
    {
      invariantKind: "departure",
      statement: "That file is let through only where a page with the property sits in its folder.",
    },
    {
      invariantKind: "departure",
      statement: "A file of that name in another folder is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A property naming no file is read from the section its files have.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file that section names is let through only under a page type carrying that property.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two properties sharing a section name are told apart by the page type in the name.",
    },
    {
      invariantKind: "departure",
      statement: "A file with more than one NUL is reported at the first.",
    },
    {
      invariantKind: "departure",
      statement: "The report says how many NULs the file carries.",
    },
    {
      invariantKind: "departure",
      statement: "A NUL is counted in the bytes rather than in the decoded text.",
    },
  ],
} as const satisfies CodeCheck
