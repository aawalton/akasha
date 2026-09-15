import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const indexEntries = {
  id: "01a04b79-16c5-70d4-884a-66c95ddbec0d",
  type: "module",
  slug: "index-entries",
  definition: "the entries a page's value implies",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file property is filed under the key a page carries rather than under its slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page claims an entry shape's file as the page claims a file property's file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A property whose page type extends a file property is in a file as that property is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which properties are entry shapes is answered here rather than by the caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which properties a page type holds in a file is answered under that page type alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which of those properties a page type keeps outside the commit is answered the same way.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The nearer declaration decides that as the nearer declaration decides the name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key reaches the property its page type declares or reaches nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A bare declaration name is narrowed across every kind of page property.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That narrowing is worked out once for an answer rather than once for a key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page type holds in a file every property every page type above that page type declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A declaration naming a page property no page property alone answers to declares nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which folder names a page type declares is answered as which file names are.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A question answered from one reading alone is answered once for that reading and held.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A declaration naming a file property group holds every member of that group in a file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A member is filed under the group's slug and then the member's slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A member is kept outside the commit where its own declaration says so or the group's does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The keys any page type holds in a file have each member under that same key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group's own key is among those keys nowhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type that is a file property group holds nothing of its own in a file.",
    },
  ],
} as const satisfies Module
