import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readStamping = {
  id: "01a0d914-c69e-74ae-8f7e-1b462ac8f909",
  type: "page-type/module",
  slug: "read-stamping",
  definition: "the id an edit carries of the body its writer read",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An edit whose writer owes reading carries the id of the body on disk at its path as it is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edit to a path with no body on disk carries no such id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A move carries no such id, since a move writes over no body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edit carrying an id already keeps that id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Of two edits at one path carrying different ids, the first kept is the one held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path whose body at HEAD has another id than the one held has moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path HEAD holds nothing at is weighed by the body on disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path neither HEAD nor disk holds a body at has moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path a machine generates, a group writes or a landing folds is held to no id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every path that moved is named in one refusal, closing in the words it is handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every edit an agent keeps carries such an id, whether a change, a draft or a take kept it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A record taken from a subagent carries the id of the body that subagent's reading names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That reading is the last the subagent made of the path, at the body it was carried onto.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sighting a subagent left is no reading a record taken is stamped with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A record taken whose subagent last read the path only partway through carries no id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A record taken whose subagent's reading of the path is not known carries no id rather than a guess.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "Only an edit kept before edits carried an id, and given none as it was taken, is held to no id.",
    },
  ],
} as const satisfies Module
