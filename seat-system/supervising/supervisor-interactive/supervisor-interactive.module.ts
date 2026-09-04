import type { Module } from "@akasha/code-system/module"

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
      statement: "A null child from adoption ends the loop, and nothing is spawned in its place.",
    },
    {
      invariantKind: "departure",
      statement:
        "exit-after-iterations counts passes already begun, so the loop runs exactly that many.",
    },
    {
      invariantKind: "departure",
      statement:
        "The agent id, session id, resume and prompt are loop variables rewritten each pass.",
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
      statement: "Nothing here spawns a child, wires its streams or reads a word of its output.",
    },
  ],
} as const satisfies Module
