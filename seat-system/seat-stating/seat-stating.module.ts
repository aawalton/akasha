import type { Module } from "@akasha/code/module"

export const seatStating = {
  id: "01a05dc3-4f16-7000-b46d-ca7a113c86a8",
  pageTypeSlug: "module",
  slug: "seat-stating",
  definition: "the page written for a seat out of what it states",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat short of a persona is written as no page.",
    },
    {
      invariantKind: "departure",
      statement: "A seat short of a domain is written as no page.",
    },
    {
      invariantKind: "departure",
      statement: "A seat short of a role is written as no page.",
    },
    {
      invariantKind: "departure",
      statement: "A seat short of a principal is written as no page.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose principal is no person names the seat above itself.",
    },
    {
      invariantKind: "departure",
      statement: "An assignment is addressed under the first page type with its slug.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no page type has is addressed as a domain.",
    },
    {
      invariantKind: "departure",
      statement: "An assignment naming a page type that has its slug is not addressed again.",
    },
    {
      invariantKind: "constraint",
      statement: "A slug two page types carry cannot be addressed from the slug alone.",
    },
    {
      invariantKind: "departure",
      statement: "An assignment the page addresses keeps the page type that page names.",
    },
    {
      invariantKind: "departure",
      statement: "An assignment addressing another slug than the seat states is addressed again.",
    },
    {
      invariantKind: "departure",
      statement: "The address a seat's page has is read from that page rather than composed.",
    },
    {
      invariantKind: "departure",
      statement: "The seat page type is reached by the id it keeps rather than by its slug.",
    },
    {
      invariantKind: "constraint",
      statement: "A stop takes away the page an address is read from.",
    },
    {
      invariantKind: "departure",
      statement: "A seat states the address the seat last had as well as the slug.",
    },
    {
      invariantKind: "departure",
      statement: "The address a seat states is kept where the page with that address has gone.",
    },
    {
      invariantKind: "departure",
      statement: "A body matching the file the body would land in is not landed again.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's page is landed by a program rather than by an agent.",
    },
    {
      invariantKind: "departure",
      statement: "The page goes in through the change adding a file.",
    },
    {
      invariantKind: "departure",
      statement: "A seat that stopped has its page taken away with the files beside that page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path the index files no page at has its page alone taken away, as nothing beside it is claimed.",
    },
    {
      invariantKind: "departure",
      statement: "That one refusal is the only refusal the page alone is taken away after.",
    },
    {
      invariantKind: "departure",
      statement: "The landing a page goes through is handed in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs the akasha command as a process.",
    },
  ],
} as const satisfies Module
