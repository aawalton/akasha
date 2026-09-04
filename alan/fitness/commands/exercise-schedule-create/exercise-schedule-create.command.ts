import type { Command } from "@akasha/command-system/command"

export const exerciseScheduleCreate = {
  id: "01a0685d-b7ab-7644-9eae-33ce30094126",
  pageTypeSlug: "command",
  slug: "exercise-schedule-create",
  definition: "the command standing up a weekly schedule and the seven days it is made of",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    {
      said: "--title <title>",
      takes: 'what the schedule is called, "Weekly Schedule" where none is said',
    },
    {
      said: "--description <markdown>",
      takes: "what the schedule is for, in the schedule's own words",
    },
    { said: "--monday <focus>", takes: "the focus Monday trains" },
    { said: "--tuesday <focus>", takes: "the focus Tuesday trains" },
    { said: "--wednesday <focus>", takes: "the focus Wednesday trains" },
    { said: "--thursday <focus>", takes: "the focus Thursday trains" },
    { said: "--friday <focus>", takes: "the focus Friday trains" },
    { said: "--saturday <focus>", takes: "the focus Saturday trains" },
    { said: "--sunday <focus>", takes: "the focus Sunday trains" },
    { said: "--json", takes: "give the schedule as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "every day takes a focus, and rest is one of them.",
    "the schedule already active is stood down before this one is stood up.",
    "a day's slug is derived from the schedule's slug and the weekday.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Exactly one schedule is active at a time.",
    },
    {
      invariantKind: "departure",
      statement: "The schedule already active is stood down before this one is stood up.",
    },
    {
      invariantKind: "departure",
      statement: "Every one of the seven weekdays states a focus.",
    },
    {
      invariantKind: "departure",
      statement: "Rest is a focus a day may state.",
    },
    {
      invariantKind: "departure",
      statement: "The days are written Monday first.",
    },
    {
      invariantKind: "departure",
      statement: "A schedule slug already taken is followed by the same slug numbered from two.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts a session.",
    },
  ],
} as const satisfies Command
