import type { Command } from "@akasha/command-system/command"

export const aliCoverage = {
  id: "01a06862-5a9b-792e-b476-9932262cc1ff",
  pageTypeSlug: "command",
  slug: "ali-coverage",
  definition: "the command saying how much of the Book of Everything has been opened at all",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "--json", takes: "give the reading as one line of JSON rather than as tables" }],
  helpNotes: [
    "a topic counts as opened where its status is anything but `unopened`, so a topic scored nought still counts.",
    "the section count is held against the sections the outline names, so it only climbs.",
    "the topic count is held against every topic page that stands, so opening a topic up can drop it.",
    "this says what has been opened; `akasha ali-fold` says how deep what was opened went.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A topic is measured unless its status is unopened.",
    },
    {
      invariantKind: "departure",
      statement: "The section count is held against the outline rather than against what stands.",
    },
    {
      invariantKind: "departure",
      statement: "The topic count is held against what stands rather than against the outline.",
    },
    {
      invariantKind: "departure",
      statement: "A part or a division nothing stands under counts nought against its own total.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a depth or a coverage.",
    },
  ],
} as const satisfies Command
