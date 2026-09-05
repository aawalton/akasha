import type { Module } from "../../code-system/modules/module.page-type.ts"

export const seatActs = {
  id: "01a0686b-bfe9-770c-b16a-b99c4d15eec7",
  pageTypeSlug: "module",
  slug: "seat-acts",
  definition: "the seat command and terminals a planned step is carried out as, one seat at a time",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat already being acted on ignores a second act rather than queueing it.",
    },
    {
      invariantKind: "departure",
      statement: "The steps of one plan run in the order the plan named them.",
    },
    {
      invariantKind: "departure",
      statement: "A step that fails ends the plan and leaves the steps after it undone.",
    },
    {
      invariantKind: "departure",
      statement: "A step that fails is said to Alan as well as written to the output.",
    },
    {
      invariantKind: "departure",
      statement: "A step names the seat to the command by the seat's name rather than by its id.",
    },
    {
      invariantKind: "departure",
      statement: "A stop asks the seat's supervisor without forcing it.",
    },
    {
      invariantKind: "departure",
      statement: "A revive is given the prompt the harness composes rather than one written here.",
    },
    {
      invariantKind: "departure",
      statement: "A resume into a terminal states the interactive mode before attaching.",
    },
    {
      invariantKind: "departure",
      statement: "The attach line is built before the resume, so a bad name costs no turn.",
    },
    {
      invariantKind: "constraint",
      statement: "A step of no known kind is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks whether the act should happen.",
    },
  ],
} as const satisfies Module
