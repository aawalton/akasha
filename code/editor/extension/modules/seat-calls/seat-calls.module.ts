import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const seatCalls = {
  id: "01a095c4-7d31-7000-a5b2-4e1f90c3ab77",
  type: "module",
  slug: "seat-calls",
  definition: "the command and arguments the editor sends for each act it offers on a seat",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call names the command by reading the slug off that command's own page.",
    },
    {
      invariantKind: "departure",
      statement: "The export a call names is worked out from that slug rather than spelled.",
    },
    {
      invariantKind: "departure",
      statement: "A command renamed on its page is renamed here with no edit.",
    },
    {
      invariantKind: "departure",
      statement: "A call names the seat by the seat's name rather than by its id.",
    },
    {
      invariantKind: "departure",
      statement: "A stop ends the subagents working under the seat along with the seat.",
    },
    {
      invariantKind: "departure",
      statement: "A revive and a resume into a terminal are the one command asked differently.",
    },
    {
      invariantKind: "departure",
      statement: "A resume into a terminal states the interactive mode.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs a call or reads what a call answered.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the editor.",
    },
  ],
} as const satisfies Module
