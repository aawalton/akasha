import type { Command } from "@akasha/command-system/command"

export const exerciseProfileSet = {
  id: "01a0685d-b7ab-77e0-9b42-1aafdf29abc7",
  pageTypeSlug: "command",
  slug: "exercise-profile-set",
  definition: "the command setting the bodyweight the coach counts volume against",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "--bodyweight <lb>", takes: "the bodyweight in pounds the volume math counts against" },
    { said: "--json", takes: "give what was written as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "the bodyweight is written onto the standing client-profile page rather than onto a new one.",
    "the answer names the moment the profile was written as well as the weight it now holds.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bodyweight is written onto the client-profile page that already stands.",
    },
    {
      invariantKind: "departure",
      statement: "A bodyweight that is no number is refused rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "The moment of the write is answered beside the weight written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here creates a profile page.",
    },
  ],
} as const satisfies Command
