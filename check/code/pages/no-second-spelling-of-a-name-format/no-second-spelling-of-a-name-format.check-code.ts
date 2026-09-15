import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noSecondSpellingOfANameFormat = {
  id: "01a05941-9823-7000-aff4-004b3f68b23c",
  type: "page-type/check-code",
  slug: "no-second-spelling-of-a-name-format",
  definition: "the check refusing a regex spelling the shape a name format states",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shape is collected from every name format's code file the index names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shape is the pattern a regex literal reads as without its flags.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A regex literal is read from the parse rather than from the text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the line spelling the shape and the file stating that shape.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A name format spelling its own shape is passed over.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Two name formats stating one shape refuse neither name format.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A shape reached rather than spelled is nothing to read.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
