import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatStating = {
  id: "01a05dc3-4f16-7000-b46d-ca7a113c86a8",
  type: "page-type/module",
  slug: "seat-stating",
  definition: "the body a seat's page carries, composed from what that seat states",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat short of a persona is written as no page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat short of a domain is written as no page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat short of a role is written as no page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat short of a principal is written as no page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose principal is no person names the seat above itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona, a role, a person and a seat above are named by page type and slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An assignment is addressed under the first page type with its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug no page type has is addressed as a domain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game's slug is addressed under the game page type, after every domain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An assignment naming a page type that has its slug is not addressed again.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A slug two page types carry cannot be addressed from the slug alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An assignment the page addresses keeps the page type that page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An assignment addressing another slug than the seat states is addressed again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The address a seat's page has is read from that page rather than composed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seat page type is reached by the id it keeps rather than by its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The type a seat's page names is imported from the file the page type states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose page type the index names no file for is written as no page.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A page written here imports its type from somewhere rather than from nowhere.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A stop takes away the page an address is read from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat states the address the seat last had as well as the slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The address a seat states is kept where the page with that address has gone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here lands a commit.",
    },
  ],
} as const satisfies Module
