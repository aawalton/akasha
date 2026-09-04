import type { CodeCheck } from "../../code-check.page-type.ts"

export const noSecondSpellingOfANameFormat = {
  id: "01a05941-9823-7000-aff4-004b3f68b23c",
  pageTypeSlug: "code-check",
  slug: "no-second-spelling-of-a-name-format",
  definition: "the check refusing a regex spelling the shape a name format states",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A shape is collected from every name format's code file the index names.",
    },
    {
      invariantKind: "departure",
      statement: "A shape is what a regex literal reads as without its flags.",
    },
    {
      invariantKind: "departure",
      statement: "A regex literal is read from the parse rather than from the text.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the line spelling the shape and the file stating that shape.",
    },
    {
      invariantKind: "absence",
      statement: "A name format spelling its own shape is passed over.",
    },
    {
      invariantKind: "absence",
      statement: "Two name formats stating one shape refuse neither name format.",
    },
    {
      invariantKind: "absence",
      statement: "A shape reached rather than spelled is nothing to read.",
    },
  ],
} as const satisfies CodeCheck
