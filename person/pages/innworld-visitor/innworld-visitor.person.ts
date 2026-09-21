import type { Person } from "akasha/person/person.page-type.types.ts"

export const innworldVisitor = {
  id: "01a0c5f6-0a35-7f1f-88e3-213ea6f2d35d",
  type: "page-type/person",
  slug: "innworld-visitor",
  definition: "the reader innworld.wiki answers when nobody signed in",
  answeredBy: "persona/elin",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This reader holds accesses of its own rather than those the reader nobody signed in as holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every access this reader holds narrows to one world.",
    },
  ],
} as const satisfies Person
