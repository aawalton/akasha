import type { ContextWarrant } from "akasha/domain/context/warrant/context-warrant.page-type.types.ts"

export const assignmentItself = {
  id: "01a0582e-2829-77ab-9ea6-760d61d23933",
  type: "page-type/context-warrant",
  slug: "assignment-itself",
  definition: "what a seat must read for the assignment it states",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat warrants the assignment the seat states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat stating no assignment warrants no assignment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An assignment whose page cannot be found is no warrant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a seat warrants an assignment of the page that seat states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat stating an initiative warrants the domain that initiative names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat stating an initiative warrants the initiative page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat stating an initiative warrants the persona that initiative states.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A subagent warrants no persona here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An assignment is looked up under the page type the assignment is stated under.",
    },
  ],
} as const satisfies ContextWarrant
