import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatStating = {
  id: "01a05dc3-4f16-7000-b46d-ca7a113c86a8",
  type: "page-type/module",
  slug: "seat-stating",
  definition: "the page written for a seat out of what it states",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat short of a persona is written as no page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat short of a domain is written as no page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat short of a role is written as no page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat short of a principal is written as no page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat whose principal is no person names the seat above itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A persona, a role, a person and a seat above are named by page type and slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An assignment is addressed under the first page type with its slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug no page type has is addressed as a domain.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An assignment naming a page type that has its slug is not addressed again.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A slug two page types carry cannot be addressed from the slug alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An assignment the page addresses keeps the page type that page names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An assignment addressing another slug than the seat states is addressed again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The address a seat's page has is read from that page rather than composed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seat page type is reached by the id it keeps rather than by its slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The type a seat's page names is imported from the file the page type states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat whose page type the index names no file for is written as no page.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A page written here imports its type from somewhere rather than from nowhere.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A stop takes away the page an address is read from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat states the address the seat last had as well as the slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The address a seat states is kept where the page with that address has gone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body matching the file the body would land in is not landed again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat's page is landed by a program rather than by an agent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page goes in through the change adding a file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat that stopped has its page taken away with the files beside that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the index files no page at has that page alone taken away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That one refusal is the only refusal the page alone is taken away after.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The landing a page goes through is handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing that committed before it refused names that commit in the refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where a seat's page sits is read from the one rule rather than spelled again.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here runs the akasha command as a process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page written over hands in the body read from it, and a new page hands in none.",
    },
  ],
} as const satisfies Module
