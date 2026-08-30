import type { Module } from "../../code-system/module/module.page-type.ts"

export const valueMinting = {
  id: "01a0503f-14ea-79f4-94bd-4c365bc24d5b",
  pageTypeSlug: "module",
  slug: "value-minting",
  definition: "the values a page being created does not carry, worked out and put into its body",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value is worked out only for a page being created.",
    },
    {
      invariantKind: "departure",
      statement: "A body carried from another path is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A property the page already states is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "Only a value worked out before the checks is put in here.",
    },
    {
      invariantKind: "departure",
      statement: "The rest waits until a commit is certain.",
    },
    {
      invariantKind: "departure",
      statement: "A generator kind nothing here can work out is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The value goes in first in the literal.",
    },
    {
      invariantKind: "departure",
      statement: "An index that will not answer works nothing out.",
    },
    {
      invariantKind: "departure",
      statement: "A caller can still write to a repository whose index is damaged.",
    },
    {
      invariantKind: "gap",
      statement: "Whether the page type declares the property is not asked here.",
    },
    {
      invariantKind: "gap",
      statement: "A second early property can go into a page whose type declares none.",
    },
    {
      invariantKind: "gap",
      statement: "The checks refuse it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file or reaches git.",
    },
    {
      invariantKind: "absence",
      statement: "It answers the changes as they would stand with their values in.",
    },
  ],
} as const satisfies Module
