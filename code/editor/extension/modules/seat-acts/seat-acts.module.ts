import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatActs = {
  id: "01a0686b-bfe9-770c-b16a-b99c4d15eec7",
  type: "module",
  slug: "seat-acts",
  definition: "the seat command and terminals a planned step is carried out as, one seat at a time",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A seat already being acted on ignores a second act rather than queueing that act.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The steps of one plan run in the order the plan named those steps.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A step that fails ends the plan and leaves the steps after that step undone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A step that fails is said to Alan as well as written to the output.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A step names the seat to the command by the seat's name rather than by its id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop ends the subagents working under the seat along with the seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat Alan stops from a panel is stopped rather than refused for being busy.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A revive names the notice rather than carrying that notice's words.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resume into a terminal states the interactive mode before attaching.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The attach line is built before the resume.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A step of no known kind is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here asks whether the act should happen.",
    },
  ],
} as const satisfies Module
