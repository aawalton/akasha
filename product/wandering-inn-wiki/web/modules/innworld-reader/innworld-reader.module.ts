import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const innworldReader = {
  id: "01a0c5fb-f556-72d8-af41-7464e370af1a",
  type: "page-type/module",
  slug: "innworld-reader",
  definition: "the one reader every request to innworld.wiki is answered for",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every request is read as the site's visitor, whether or not anyone signed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The routes answering pages name the same reader the server reads, so the two gates agree.",
    },
  ],
} as const satisfies Module
