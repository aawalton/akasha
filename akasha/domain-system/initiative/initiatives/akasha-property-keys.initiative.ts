import type { Initiative } from "../initiative.page-type.ts"

export const akashaPropertyKeys = {
  id: "01a05397-35f0-78f4-9605-ec96d1d8adfa",
  pageTypeSlug: "initiative",
  slug: "akasha-property-keys",
  domainSlug: "domain/pages-system",
  personaSlug: "akasha",
  intents: [
    {
      statement: "A key is the plainest name standing alone among what its declarer carries.",
      workingMemory:
        "Keys were camelised from slugs, which must stand alone among a property type's pages, so many carry qualifiers only the slug ever needed. `refactor rename property-slug` moves a key without moving its slug, and every reader now takes the key from the property, so a key can be renamed on its own.",
    },
    {
      statement:
        "A reader asks what a page's type carries rather than probing every key it knows against every page.",
    },
  ],
  constraints: [
    "Every property states its key rather than falling back to its slug.",
    "Where a key stands alone is a fact about what declares it rather than about the property itself.",
    "The check comes before the readers, since it cannot resolve a declaration to its key until the schema carries one.",
  ],
} as const satisfies Initiative
