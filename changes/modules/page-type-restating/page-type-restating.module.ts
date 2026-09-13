import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const pageTypeRestating = {
  id: "01a09c71-f017-713f-a7a3-8d4e8c6f13e8",
  type: "module",
  slug: "page-type-restating",
  definition: "the page type a body states, restated with the type that body satisfies",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page type the body states now is read off the body rather than handed in.",
    },
    {
      invariantKind: "departure",
      statement: "The page type the body moves to is named by the path of that page type's page.",
    },
    {
      invariantKind: "departure",
      statement: "The type the body is declared to satisfy is restated beside the page type.",
    },
    {
      invariantKind: "departure",
      statement: "Every key the body states the page type under is restated.",
    },
    {
      invariantKind: "departure",
      statement: "The import naming that type is restated to reach the page type named.",
    },
    {
      invariantKind: "departure",
      statement: "That import names the page type from the root rather than by a relative path.",
    },
    {
      invariantKind: "departure",
      statement:
        "The import reaches the type file beside that page type where that page type has one.",
    },
    {
      invariantKind: "departure",
      statement: "A body stating the page type named already is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body stating no page type is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body importing no type named for the page type that body states is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path with no body is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page type named by a path with no body is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Each passage is answered as a replace over the body rather than reached for.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a change.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out which files a page keeps beside it.",
    },
  ],
} as const satisfies Module
