import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatName = {
  id: "01a09c43-0bf5-7991-a2dc-650268201505",
  type: "domain",
  slug: "seat-name",
  definition: "the name a seat goes by",
  parts: [
    "module/compose-seat-name",
    "module/initiative-seat-name",
    "module/seat-flex",
    "module/seat-name-restate",
    "module/seat-name-stands",
    "module/seat-nameable",
    "module/seat-rename",
    "module/seat-session-rename",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat's name is the domain followed by the role followed by the flex.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The persona a seat begins with is read from the seat's page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat's flex is in its name rather than beside the seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat's name spells no on-call assignment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A seat's name and its terminal tab name and its Remote Control session title are one value.",
    },
    { invariantKind: "invariant-kind/departure", statement: "A seat name is never ambiguous." },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The narrower reading wins where more than one set of stated values would spell one name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat name reaches the seat that had the name most recently.",
    },
  ],
} as const satisfies Domain
