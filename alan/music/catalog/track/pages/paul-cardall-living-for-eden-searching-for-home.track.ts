import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenSearchingForHome = {
  id: "01a0b4c8-4b26-74d8-82ff-853bca66ae59",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-searching-for-home",
  ownLength: 5.014666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2hX16COFGC928DzCF4X3fx",
      externalLink: "https://open.spotify.com/track/2hX16COFGC928DzCF4X3fx",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Searching For Home",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "searchingforhome|7FQRbf8gbKw8KZQZAJWxH2|300880",
  song: "song/paul-cardall-searching-for-home",
} as const satisfies Track
