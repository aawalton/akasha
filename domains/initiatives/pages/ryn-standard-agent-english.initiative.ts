import type { Initiative } from "../initiative.page-type.ts"

export const rynStandardAgentEnglish = {
  id: "01a07c11-5ffa-730d-b999-14bed1d3267f",
  pageTypeSlug: "initiative",
  slug: "ryn-standard-agent-english",
  domainSlug: "workspace-package/plain-language",
  personaSlug: "ryn",
  intents: [
    {
      statement: "The load a construction puts on a reading agent is measured.",
    },
  ],
  constraints: [
    "The load a construction puts on a reading agent is measured.",
    "Standard Agent English is designed from first principles, unbiased by current usage.",
  ],
} as const satisfies Initiative
