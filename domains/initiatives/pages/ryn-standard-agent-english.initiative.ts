import type { Initiative } from "../initiative.page-type.types.ts"

export const rynStandardAgentEnglish = {
  id: "01a07c11-5ffa-730d-b999-14bed1d3267f",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "ryn-standard-agent-english",
  domain: "domain/plain-language",
  persona: "ryn",
  intents: [
    {
      statement: "The load a construction puts on a reading agent is measured.",
    },
    {
      statement: "Standard Agent English defines what terms are allowed.",
    },
    {
      statement: "Standard Agent English defines what constructions are allowed.",
    },
    {
      statement: "Standard Agent English defines what terms are not allowed.",
    },
    {
      statement: "Nothing writes hold where have says the same thing.",
    },
    {
      statement: "Nothing writes carry where have says the same thing.",
    },
  ],
  constraints: [
    "The load a construction puts on a reading agent is measured.",
    "Standard Agent English is designed from first principles, unbiased by current usage.",
    "The reader is an agent rather than a person.",
    "Standard Agent English is built beside the taboo terms and the sentence shapes, and those pages are deleted only once Alan says Standard Agent English is mature.",
  ],
} as const satisfies Initiative
