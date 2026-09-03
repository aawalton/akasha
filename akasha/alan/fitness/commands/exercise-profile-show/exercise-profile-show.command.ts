import type { Command } from "@akasha/command-system/command"

export const exerciseProfileShow = {
  id: "01a0685d-b7ab-7879-92e7-e67a6ceff48a",
  pageTypeSlug: "command",
  slug: "exercise-profile-show",
  definition: "the command naming the bodyweight the coach counts volume against",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--json", takes: "give the bodyweight as JSON rather than as a tab-separated row" },
  ],
  helpNotes: [
    "the bodyweight stands on the client-profile page and is read from there on every call.",
    "the weight is in pounds.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bodyweight is read from the client-profile page.",
    },
    {
      invariantKind: "departure",
      statement: "No profile page standing is a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A profile stating no bodyweight is a refusal rather than a zero.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes the profile.",
    },
  ],
} as const satisfies Command
