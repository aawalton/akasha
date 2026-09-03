import type { Command } from "@akasha/command-system/command"

export const emailUnsubscribe = {
  id: "01a06810-cf11-7b83-a5f8-81736bc497fb",
  pageTypeSlug: "command",
  slug: "email-unsubscribe",
  definition: "the command getting off the list one message came from, by the headers it carries",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<id>", takes: "the message acted on, said as the id Gmail gives it" },
    { said: "--message <id>", takes: "the message acted on, where no id stands after the command" },
  ],
  helpNotes: [
    "the route is the message's own List-Unsubscribe and List-Unsubscribe-Post headers and nothing else.",
    "one-click is fired where the sender says it is offered, and a mailto is fallen back to otherwise.",
    "an unsubscribe once fired is not taken back.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An unsubscribe goes by the message's own List-Unsubscribe headers.",
    },
    {
      invariantKind: "departure",
      statement: "One-click is used only where the sender says it is offered.",
    },
    {
      invariantKind: "departure",
      statement: "A mailto is fallen back to where one-click is not offered.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here follows a link found in a message body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says what an unsubscribe would do without doing it.",
    },
  ],
} as const satisfies Command
