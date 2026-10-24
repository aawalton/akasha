import type { ContextWarrant } from "akasha/domain/context/warrant/context-warrant.page-type.types.ts"

export const personItself = {
  id: "01a0595f-f1a6-7dc0-bd43-a634801f920a",
  type: "page-type/context-warrant",
  slug: "person-itself",
  definition: "what a persona or handler seat must read for the person it states",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat in the personas or handlers section warrants the one person it states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat assigned a story warrants no person.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat stating no person warrants no person.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat stating several persons warrants none of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person whose page cannot be found is no warrant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a seat warrants a person.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A person is named by its slug wherever the seat states the person under a page type.",
    },
  ],
  createdAt: "2026-08-31T19:50:55.142Z",
  updatedAt: "2026-10-24T18:08:14.228Z",
} as const satisfies ContextWarrant
