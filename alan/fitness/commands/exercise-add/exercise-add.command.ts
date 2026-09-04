import type { Command } from "@akasha/command-system/command"

export const exerciseAdd = {
  id: "01a0685c-7d81-752c-a76f-049e0e7fecb5",
  pageTypeSlug: "command",
  slug: "exercise-add",
  definition: "the command putting a movement of Alan's own into the catalog",
  code: "ts",
  changeKindSlug: "change-checked",
  taking: [
    { said: "<title>", takes: "the name of the movement, said as the first word" },
    { said: "--title <title>", takes: "the name of the movement" },
    {
      said: "--slug <slug>",
      takes: "the name it is reached by, worked out from the title otherwise",
    },
    { said: "--category <value>", takes: "the sort of training the movement is" },
    { said: "--equipment <value>", takes: "what the movement is loaded with" },
    { said: "--force <value>", takes: "whether the movement pushes, pulls or holds" },
    { said: "--level <value>", takes: "how much practice the movement asks for" },
    { said: "--mechanic <value>", takes: "whether the movement works one joint or several" },
    { said: "--primary-muscles <csv>", takes: "the muscles the movement works, parted by commas" },
    {
      said: "--secondary-muscles <csv>",
      takes: "the muscles it works besides those, parted by commas",
    },
    { said: "--load-factor <n>", takes: "how much of Alan's bodyweight each rep moves" },
    { said: "--implement-count <n>", takes: "how many implements the weight recorded stands for" },
    { said: "--json", takes: "answer as JSON rather than as a line meant for a reader" },
  ],
  helpNotes: [
    "this is for movements the free exercise database does not cover, and the sync passes over what it makes.",
    "a value is said as its label or as its dashed id, and either is taken.",
    "the fields the selector reads are worked out from what the call classifies the movement as.",
    "the load factor and the implement count are always written, so the volume arithmetic meets no silent default.",
    "the name it is reached by is worked out from the title unless `--slug` says otherwise.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A movement made here says it is Alan's own rather than the database's.",
    },
    {
      invariantKind: "departure",
      statement: "A movement made here carries no external id, so the sync passes over it.",
    },
    {
      invariantKind: "departure",
      statement: "The fields the selector reads are derived rather than asked for.",
    },
  ],
} as const satisfies Command
