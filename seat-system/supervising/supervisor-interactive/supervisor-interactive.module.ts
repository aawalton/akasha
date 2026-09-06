import type { Module } from "@akasha/code/module"

export const supervisorInteractive = {
  id: "01a06871-3115-700a-b93f-c32bdd8735c6",
  pageTypeSlug: "module",
  slug: "supervisor-interactive",
  definition: "a seat's run as a repeated loop of Claude children, one iteration at a time",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The loop goes round only when the supervisor killed the child and no shutdown is under way.",
    },
    {
      invariantKind: "departure",
      statement: "A null child from adoption ends the loop.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is spawned in the place of a null child.",
    },
    {
      invariantKind: "departure",
      statement: "exit-after-iterations counts the iterations already begun.",
    },
    {
      invariantKind: "departure",
      statement: "The loop runs exactly the count exit-after-iterations states.",
    },
    {
      invariantKind: "departure",
      statement:
        "The agent id and session id and resume and prompt are loop variables rewritten each round.",
    },
    {
      invariantKind: "departure",
      statement: "A null pending event at exit breaks the loop.",
    },
    {
      invariantKind: "departure",
      statement:
        "The idle probe reads the Claude pid through a closure that is empty on the first pass.",
    },
    {
      invariantKind: "departure",
      statement: "Every exit path runs the same finalize step over the last child and the proxy.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here spawns a child or wires its streams or reads a word of its output.",
    },
  ],
} as const satisfies Module
