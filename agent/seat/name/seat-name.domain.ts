import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatName = {
  id: "01a09c43-0bf5-7991-a2dc-650268201505",
  type: "page-type/domain",
  slug: "seat-name",
  definition: "a seat's name",
  parts: [
    "module/agent-name-bind",
    "module/compose-seat-name",
    "module/initiative-seat-name",
    "module/seat-flex",
    "module/seat-name-bind",
    "module/seat-name-claim",
    "module/seat-name-held-refusal",
    "module/seat-name-restate",
    "module/seat-name-stands",
    "module/seat-nameable",
    "module/seat-rename",
    "module/seat-session-rename",
    "module/seat-session-follow",
    "module/seat-spawn-name-decide",
    "module/seat-stated-name-refusal",
    "module/spawn-guard",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's name is the domain followed by the role followed by the flex.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person's handler seat is named for the person alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat of persons whose persona is not the default is named for that persona, whatever its persons.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The persona a seat begins with is read from the seat's page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's flex is in its name rather than beside the seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's name spells no on-call assignment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat's name and its terminal tab name and its Remote Control session title are one value.",
    },
    { decisionKind: "decision-kind/departure", statement: "A seat name is never ambiguous." },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The narrower reading wins where more than one set of stated values would spell one name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat name reaches the seat that had the name most recently.",
    },
  ],
  createdAt: "2026-09-13T19:33:54.805Z",
  updatedAt: "2026-10-24T20:40:20.578Z",
} as const satisfies Domain
