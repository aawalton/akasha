import type { CodeCheck } from "../../code-check.page-type.ts"

export const nameFormatJudgesByOneShape = {
  id: "01a05946-775f-7000-9f76-45d9dcf376ed",
  pageTypeSlug: "code-check",
  slug: "name-format-judges-by-one-shape",
  definition: "the check refusing a name format not judging by one shape its own code hands over",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: true,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every name format the index files is judged whatever the change carries.",
    },
    {
      invariantKind: "departure",
      statement: "A format no property names is judged like any other.",
    },
    {
      invariantKind: "departure",
      statement: "A format's judgement is loaded through `format-reaching` rather than again here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A format's code is loaded from wherever its body sits on disk rather than from the change.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change writing a format's code anew is refused rather than judged by the body before the change.",
    },
    {
      invariantKind: "departure",
      statement:
        "What shape a format hands over is read from the body the change leaves rather than from the disk.",
    },
    {
      invariantKind: "departure",
      statement: "A format exports one name bound to `matching` of a shape written out.",
    },
    {
      invariantKind: "departure",
      statement: "A shape reached through a name is no shape written out.",
    },
    {
      invariantKind: "departure",
      statement: "The one name a format exports is the one its slug answers to.",
    },
    {
      invariantKind: "constraint",
      statement: "A shape carrying the `g` flag is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shape carrying `g` keeps a `lastIndex` between asks and so answers one name differently.",
    },
    {
      invariantKind: "departure",
      statement: "A format that fails is named in a refusal of its own.",
    },
    {
      invariantKind: "absence",
      statement: "What a shape lets through is not judged here.",
    },
    {
      invariantKind: "absence",
      statement: "Whether two formats carry one shape is not judged here.",
    },
  ],
} as const satisfies CodeCheck
