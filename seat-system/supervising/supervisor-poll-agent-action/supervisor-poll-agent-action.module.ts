import type { Module } from "@akasha/code/module"

export const supervisorPollAgentAction = {
  id: "01a0687b-aa81-7000-ada8-b1a18075e043",
  pageTypeSlug: "module",
  slug: "supervisor-poll-agent-action",
  definition: "reading the action a seat has been asked to take",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The actions a seat can be asked to take are spelled here.",
    },
    {
      invariantKind: "gap",
      statement: "Those actions are read from the pages of the supervisor-action page type.",
    },
  ],
} as const satisfies Module
