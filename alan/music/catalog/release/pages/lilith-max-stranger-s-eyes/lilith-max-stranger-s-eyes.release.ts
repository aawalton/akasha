import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxStrangerSEyes = {
  id: "01a0676a-d72a-702b-bf57-6d9d2f925184",
  type: "page-type/release",
  slug: "lilith-max-stranger-s-eyes",
  grade: "C",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2021-03-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5U90VwDavvq29LdBCxiwZn",
      externalLink: "https://open.spotify.com/album/5U90VwDavvq29LdBCxiwZn",
    },
  ],
  title: "Stranger's Eyes",
} as const satisfies Release
