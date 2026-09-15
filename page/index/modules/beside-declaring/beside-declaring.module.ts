import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const besideDeclaring = {
  id: "01a0a5b6-b8e0-7795-a6eb-c2223e6dd24f",
  type: "module",
  slug: "beside-declaring",
  definition: "the files a page type declares beside every page of that type",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A type declares every property every type above that type declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The nearer declaration decides the file a property's declaration defaults.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which types declare a secret is answered here rather than by the caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which types declare a value kept outside the commit is answered the same way.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A declaration fixing a file property's value declares that file as a default does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A declaration naming a file property group declares a file for each member.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A member is named by the group's slug and then the member's slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A member is kept outside the commit where its own declaration says so or the group's does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page type that is a file property group declares nothing of its own beside its pages.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says where a declared file sits.",
    },
  ],
} as const satisfies Module
