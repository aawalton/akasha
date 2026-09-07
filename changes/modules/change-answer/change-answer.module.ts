import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const changeAnswer = {
  id: "01a07721-531c-732a-a072-2842893f0584",
  pageTypeSlug: "module",
  slug: "change-answer",
  definition: "the edits a change answers rather than writes",
  code: "ts",
  types: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An argument a change was handed no value for is refused by the key naming that argument.",
    },
    {
      invariantKind: "departure",
      statement: "An edit stating no body takes its path away.",
    },
    {
      invariantKind: "departure",
      statement: "An edit naming a path that edit came from is a move.",
    },
    {
      invariantKind: "departure",
      statement: "An edit states whether the readers of its path owe the reading again.",
    },
    {
      invariantKind: "departure",
      statement: "An edit stating nothing there leaves its readers owing the reading.",
    },
    {
      invariantKind: "departure",
      statement: "An edit states the body that edit was worked out from.",
    },
    {
      invariantKind: "departure",
      statement: "Two edits to one path gather only where the later followed the earlier.",
    },
    {
      invariantKind: "departure",
      statement: "A move gathers with the write that move follows under the path left behind.",
    },
    {
      invariantKind: "departure",
      statement: "A move landing where another edit already answers is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A later edit to a path replaces an earlier edit to that path.",
    },
    {
      invariantKind: "departure",
      statement: "One refusal refuses the whole answer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or writes to the disk.",
    },
  ],
} as const satisfies Module
