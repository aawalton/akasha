import type { Initiative } from "../initiative.page-type.ts"

export const emberMigrateTemperToAkasha = {
  id: "01a05d98-bb3e-723e-bb49-4b57786306a0",
  pageTypeSlug: "initiative",
  slug: "ember-migrate-temper-to-akasha",
  domainSlug: "domain/akasha-migration",
  personaSlug: "ember",
  parentSlug: "akasha-migration",
  intents: [
    { statement: "Temper is a domain in akasha, and every part of it is a page there." },
    { statement: "No part of temper is outside akasha." },
  ],
} as const satisfies Initiative
