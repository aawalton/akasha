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
        "A reader asks which pages carry a property rather than composing that answer at each call site.",
    },
    {
      statement:
        "Whatever matches a page's key to its property reads the pairing from the property rather than working one out from the other.",
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
