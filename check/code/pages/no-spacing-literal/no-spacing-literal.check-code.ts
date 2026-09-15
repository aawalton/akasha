import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noSpacingLiteral = {
  id: "01a0827a-4d80-79bc-bbe8-8a9a67dd2103",
  type: "page-type/check-code",
  slug: "no-spacing-literal",
  definition:
    "the check refusing a gap or padding written out rather than taken from a spacing step",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A gap a spacing step has is reached by name rather than written out again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dimension is judged in Swift and nowhere else.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A labelled gap and a labelled least length and a labelled stroke width are dimensions.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A number a padding is handed without a label is a dimension.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A label handed anything but a number is no dimension.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A number inside a string is no dimension.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A number inside a line comment is no dimension.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A dimension is the kind of dimension that dimension is together with the number written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A width a thing is drawn at is judged as a distance between two things is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A gap named across and a gap named down are the kind a gap named plainly is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A grant names one file and the values Alan let that file have.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each value a grant names has a reason.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A grant reaches only the file the grant names and only the values the grant names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A grant names its file by the page with that file rather than by a path.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "How many times a granted value is written in its file is not counted here.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
