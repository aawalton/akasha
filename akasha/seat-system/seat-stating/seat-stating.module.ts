import type { Module } from "@akasha/code-system/module"

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
      statement: "An assignment is addressed under the first page type carrying its slug.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no page type carries is addressed as a domain.",
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
      statement: "A seat that stopped has its page taken away here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs the akasha command as a process.",
    },
  ],
} as const satisfies Module
