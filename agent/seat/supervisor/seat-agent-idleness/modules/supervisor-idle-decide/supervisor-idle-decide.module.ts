import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorIdleDecide = {
  id: "01a06838-5a84-7000-a52b-bc6acad18e78",
  type: "page-type/module",
  slug: "supervisor-idle-decide",
  definition: "whether a seat's agent is working",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat is idle only where nothing is in flight and no child is busy and Claude is present.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count that was not read is not a count of zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat with a count that was not read is not idle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A restart that keeps the session running ignores the children the seat dispatched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Past the context cliff only work in flight has a restart back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A busy reason names each count that is not zero and says `unread` for a count never read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A child of the seat running MCP is no busy child.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An MCP child is known by a marker in its command line rather than by its name.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a process or a port or a page.",
    },
  ],
} as const satisfies Module
