import type { Initiative } from "../initiative.page-type.ts"

export const akashaPropertyKeys = {
  id: "01a05397-35f0-78f4-9605-ec96d1d8adfa",
  pageTypeSlug: "initiative",
  slug: "akasha-property-keys",
  domainSlug: "domain/pages-system",
  personaSlug: "akasha",
  intents: [
    {
      statement:
        "A reader asks what a page's type carries rather than probing every key it knows against every page.",
      workingMemory:
        "`knownIn` builds one map from key to property over the whole corpus, so a key two properties carry answers as whichever was read last. `name` is carried by `index-name` and by `name` today and nothing goes wrong, both being text and the reader acting only on relations.",
    },
    {
      statement: "A key is the plainest name standing alone among what its declarer carries.",
      workingMemory:
        "Keys were camelised from slugs, which must stand alone among a property type's pages, so many carry qualifiers only the slug ever needed. `person-access` and `person-authority` spell their own name into all seven of theirs. Shortening one to `personSlug` would put two relation properties on one key.",
    },
  ],
  constraints: [
    "Every property states its key rather than falling back to its slug.",
    "Where a key stands alone is a fact about what declares it rather than about the property itself.",
    "The check comes before the readers, since it cannot resolve a declaration to its key until the schema carries one.",
    "A key is shortened only once a reader can tell two properties carrying one key apart.",
  ],
} as const satisfies Initiative
