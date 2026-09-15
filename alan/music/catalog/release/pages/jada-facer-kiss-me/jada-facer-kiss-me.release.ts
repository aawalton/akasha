import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerKissMe = {
  id: "01a0676a-d722-7048-8271-c09632b3f006",
  type: "page-type/release",
  slug: "jada-facer-kiss-me",
  title: "Kiss Me",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.731167,
  ownProgress: 2.731167,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-05-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4n2bJwvRqVQ0dCqOwANJY4",
      externalLink: "https://open.spotify.com/album/4n2bJwvRqVQ0dCqOwANJY4",
    },
  ],
} as const satisfies Release
