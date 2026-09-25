import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const anneMccaffrey = {
  id: "01a06807-f090-7003-901f-8629ad273fa6",
  type: "page-type/author",
  slug: "anne-mccaffrey",
  title: "Anne McCaffrey",
  partOfCollections: ["author-collection/science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
  externalIdentity: [
    {
      source: "wikipedia",
      externalId: "Anne_McCaffrey",
      externalLink: "https://en.wikipedia.org/wiki/Anne_McCaffrey",
    },
  ],
} as const satisfies Author
