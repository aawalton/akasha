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
        "Whatever matches a page's key to its property reads the pairing from the property rather than working one out from the other.",
      workingMemory:
        "`generatedProperties` files each property under its slug, and `value-minting` and `typecheck` camelise that slug into the key, so the pairing is worked out rather than read. `id` is the one generated property today and its slug and key are the same word, so nothing is wrong yet.",
    },
    {
      statement:
        "A command rewriting code resolves each spelling through the checker rather than by matching its text.",
      workingMemory:
        "`move`, `remove` and `refactor rename page-type` rewrite code by parse and text match today, and each is to be judged on whether it should read types instead.",
    },
    {
      statement: "A key is the plainest name standing alone among what its declarer carries.",
      workingMemory:
        "Keys were camelised from slugs, which must stand alone among a property type's pages, so many carry qualifiers only the slug ever needed. `refactor rename property-slug` moves a key without moving its slug, so each key can be judged on how it reads where it is carried.",
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
    "A generated property's key waits until what mints it reads the pairing rather than camelising the slug.",
  ],
} as const satisfies Initiative
