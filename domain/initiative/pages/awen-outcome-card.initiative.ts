import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenOutcomeCard = {
  id: "01a18395-ebaa-75df-be04-f7a5743e81df",
  type: "page-type/initiative",
  slug: "awen-outcome-card",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "An outcome card matches Voyage's layout, using our styling and colors." },
    { statement: "An outcome card animates a roll while the decision is being evaluated." },
    {
      statement:
        "The roll runs between the seven possible outcomes before landing on the one determined.",
    },
  ],
  constraints: [
    "The roll animation may be faked with a fixed duration.",
    "Only Alan takes turns in gifted-reborn; its turn-2 card is mended in place.",
    "Screenshots use https://alanwalton.com.",
  ],
  createdAt: "2026-10-28T17:36:42.921Z",
  updatedAt: "2026-10-28T17:36:42.921Z",
} as const satisfies Initiative
