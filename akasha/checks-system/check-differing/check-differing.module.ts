import type { Module } from "@akasha/code-system/module"

export const checkDiffering = {
  id: "01a05e07-1491-7cd3-be69-1fa1db03591d",
  pageTypeSlug: "module",
  slug: "check-differing",
  definition: "a check's verdict taken twice over one change, once with the tree contradicting it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A verdict is taken with the tree agreeing and again with the tree contradicting.",
    },
    {
      invariantKind: "departure",
      statement: "The tree is contradicted at the paths the change carries and at no other.",
    },
    {
      invariantKind: "departure",
      statement: "A check whose two verdicts differ is reading the tree.",
    },
    {
      invariantKind: "departure",
      statement: "A check no change reached is unmeasured rather than clean.",
    },
    {
      invariantKind: "departure",
      statement: "The three answers a check is given are moved and held and never run.",
    },
    {
      invariantKind: "departure",
      statement: "Every check is reached through `judgingBy` rather than called directly.",
    },
    {
      invariantKind: "departure",
      statement: "A check is judged alone so the verdict answered is its own.",
    },
    {
      invariantKind: "departure",
      statement: "Each run is handed a change of its own rather than one held between them.",
    },
    {
      invariantKind: "departure",
      statement: "A scenario whose change casts no shadow is dropped rather than read as held.",
    },
    {
      invariantKind: "departure",
      statement: "A differential inside a test run is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A check some change reached is run over both readings of the tree.",
    },
    {
      invariantKind: "departure",
      statement: "The coverage answered is how many of the checks gathered were run at all.",
    },
    {
      invariantKind: "departure",
      statement: "A check no scenario reached is given a scenario carrying what its input takes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes a check or the working tree.",
    },
    {
      invariantKind: "gap",
      statement: "A gate runs this over a change before that change lands.",
    },
  ],
} as const satisfies Module
