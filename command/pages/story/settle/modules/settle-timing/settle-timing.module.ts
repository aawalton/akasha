import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const settleTiming = {
  id: "01a1802d-3489-704f-9077-2fb3e63e348b",
  type: "page-type/module",
  slug: "settle-timing",
  definition: "the instant a turn's time-passing reading starts from",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story's time check is its check `<story>-time-passing`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn starts where the latest turn before it ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where no turn came before, it starts where the latest chapter ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story's first turn starts at the story's opensAt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A time reading stating no `from` is handed that start.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A time reading stating another `from` is refused, naming that start.",
    },
  ],
  createdAt: "2026-10-28T01:43:28.649Z",
  updatedAt: "2026-10-28T01:43:28.649Z",
} as const satisfies Module
