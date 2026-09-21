import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const elinWanderingInnWiki = {
  id: "01a0b79c-5a7d-7503-9433-d4b294b29610",
  type: "page-type/initiative",
  slug: "elin-wandering-inn-wiki",
  domain: "domain/wandering-inn-wiki",
  persona: "persona/elin",
  intentStack: [
    {
      statement:
        "An anonymous reader is answered only the pages a grant names, and is refused every write.",
    },
    { statement: "innworld.wiki serves the pages of one world and no other page akasha holds." },
  ],
} as const satisfies Initiative
