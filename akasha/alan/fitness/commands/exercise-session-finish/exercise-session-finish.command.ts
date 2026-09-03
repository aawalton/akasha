import type { Command } from "@akasha/command-system/command"

export const exerciseSessionFinish = {
  id: "01a0685d-b7ab-7b9c-bdb1-9464dff08bd5",
  pageTypeSlug: "command",
  slug: "exercise-session-finish",
  definition: "the command closing a workout session and naming how long it ran and what it moved",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    {
      said: "--session <ref>",
      takes: "the session closed, named by id, by title or by part of either",
    },
    { said: "--notes <markdown>", takes: "what is added to the notes the session already carries" },
    { said: "--json", takes: "give the closing as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "the session left unsaid is the most recent one still open.",
    "notes given are added under the notes already standing rather than written over them.",
    "the duration is the minutes between the moment started and the moment closed.",
    "the volume counts the bodyweight the client profile states.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The session left unsaid is the most recent one still open.",
    },
    {
      invariantKind: "departure",
      statement: "Notes given are added under the notes already standing.",
    },
    {
      invariantKind: "departure",
      statement: "The session carries the moment it was completed.",
    },
    {
      invariantKind: "departure",
      statement: "The duration is the whole minutes between the moment started and that moment.",
    },
    {
      invariantKind: "departure",
      statement:
        "A session carrying no moment started is answered with no duration rather than zero.",
    },
    {
      invariantKind: "departure",
      statement: "The volume is counted against the bodyweight the client profile states.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here logs a set.",
    },
  ],
} as const satisfies Command
