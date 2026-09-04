import type { Module } from "@akasha/code-system/module"

export const supervisorIdleDecide = {
  id: "01a06838-5a84-7000-a52b-bc6acad18e78",
  pageTypeSlug: "module",
  slug: "supervisor-idle-decide",
  definition: "whether the agent in a seat is doing nothing at this moment",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A seat is idle only where nothing is in flight, no child is busy and Claude is present.",
    },
    {
      invariantKind: "departure",
      statement:
        "A count that was not read is not a count of zero, so a seat it belongs to is not idle.",
    },
    {
      invariantKind: "departure",
      statement:
        "A restart that keeps the session running ignores the children the seat dispatched.",
    },
    {
      invariantKind: "departure",
      statement: "Past the context cliff only what is in flight holds a restart back.",
    },
    {
      invariantKind: "departure",
      statement:
        "A busy reason names each count that is not zero and says `unread` for one never read.",
    },
    {
      invariantKind: "departure",
      statement: "A child of the seat running MCP is no busy child.",
    },
    {
      invariantKind: "departure",
      statement: "An MCP child is known by a marker in its command line rather than by its name.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a process, a port or a page.",
    },
  ],
} as const satisfies Module
