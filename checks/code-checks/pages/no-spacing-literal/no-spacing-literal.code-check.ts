import type { CodeCheck } from "../../code-check.page-type.ts"

export const noSpacingLiteral = {
  id: "01a0827a-4d80-79bc-bbe8-8a9a67dd2103",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "no-spacing-literal",
  definition:
    "the check refusing a gap or padding written out rather than taken from a spacing step",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A gap a spacing step has is reached by name rather than written out again.",
    },
    {
      invariantKind: "departure",
      statement: "A dimension is judged in Swift and nowhere else.",
    },
    {
      invariantKind: "departure",
      statement:
        "A labelled gap, a labelled least length and a labelled stroke width are dimensions.",
    },
    {
      invariantKind: "departure",
      statement: "A number a padding is handed without a label is a dimension.",
    },
    {
      invariantKind: "departure",
      statement: "A label handed anything but a number is no dimension.",
    },
    {
      invariantKind: "departure",
      statement: "A number inside a string is no dimension.",
    },
    {
      invariantKind: "departure",
      statement: "A number inside a line comment is no dimension.",
    },
    {
      invariantKind: "departure",
      statement: "A dimension is the kind of dimension it is together with the number written.",
    },
    {
      invariantKind: "departure",
      statement: "A width a thing is drawn at is judged as a distance between two things is.",
    },
    {
      invariantKind: "departure",
      statement: "A gap named across and a gap named down are the kind a gap named plainly is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A grant names one file and the values Alan let that file have, each with a reason.",
    },
    {
      invariantKind: "departure",
      statement: "A grant reaches only the file the grant names and only the values it names.",
    },
    {
      invariantKind: "departure",
      statement: "A grant names its file by the page with that file rather than by a path.",
    },
    {
      invariantKind: "gap",
      statement:
        "No check counts how many times a granted value is written in the file granted it.",
    },
  ],
  check: { maxCpuSeconds: 10 },
} as const satisfies CodeCheck
