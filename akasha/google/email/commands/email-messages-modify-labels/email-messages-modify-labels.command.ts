import type { Command } from "@akasha/command-system/command"

export const emailMessagesModifyLabels = {
  id: "01a06810-cf11-753d-aad0-e13c11000ad2",
  pageTypeSlug: "command",
  slug: "email-messages-modify-labels",
  definition: "the command putting label ids on one Gmail message and taking label ids off it",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<id>", takes: "the message acted on, said as the id Gmail gives it" },
    { said: "--message <id>", takes: "the message acted on, where no id stands after the command" },
    { said: "--add <label-id>", takes: "a label id to put on it, said again for each" },
    { said: "--remove <label-id>", takes: "a label id to take off it, said again for each" },
  ],
  helpNotes: [
    "a relabelling naming neither an addition nor a removal is refused, since it would be no act.",
    "the labels the message carries afterwards come back with its id and its thread.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A relabelling naming neither an addition nor a removal is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A label is named by its id rather than by the name it is shown under.",
    },
    {
      invariantKind: "departure",
      statement: "What comes back is the labels the message carries after the change.",
    },
  ],
} as const satisfies Command
