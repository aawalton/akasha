import type { Command } from "akasha/commands/command.page-type.types.ts"

export const emailUnsubscribe = {
  id: "01a06810-cf11-7b83-a5f8-81736bc497fb",
  type: "command",
  slug: "email-unsubscribe",
  definition: "the command getting off the list one message came from, by the headers it has",
  code: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An unsubscribe once fired is not taken back.",
    },
    {
      invariantKind: "departure",
      statement: "An unsubscribe goes by the message's own List-Unsubscribe headers.",
    },
    {
      invariantKind: "departure",
      statement: "One-click is used only where the sender says one-click is offered.",
    },
    {
      invariantKind: "departure",
      statement: "A mailto is fallen back to where one-click is not offered.",
    },
    {
      invariantKind: "departure",
      statement: "An unsubscribe that threw after Gmail took the mailto says the mailto went.",
    },
    {
      invariantKind: "departure",
      statement: "An unsubscribe refused over a one-click answer says the POST reached the server.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here follows a link found in a message body.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here says the effect an unsubscribe would have without doing that unsubscribe.",
    },
  ],
  name: "unsubscribe",
  arguments: [{ argument: "argument/message", required: true, saidAs: "flag-or-word" }],
} as const satisfies Command
