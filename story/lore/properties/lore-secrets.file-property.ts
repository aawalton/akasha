import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const loreSecrets = {
  id: "01a0deeb-9c4e-792c-b6e8-bb426527d31e",
  type: "page-type/file-property",
  slug: "lore-secrets",
  propertySlug: "secrets",
  definition: "the facts a piece of lore holds that no one but the world builder knows",
  extensions: ["jsonl"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is one fact, written as a quoted string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fact told to anyone leaves this file for the page's facts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This file is withheld from a game master's seat whole.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
