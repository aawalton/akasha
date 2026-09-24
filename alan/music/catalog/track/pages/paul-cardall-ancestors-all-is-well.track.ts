import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsAllIsWell = {
  id: "01a0b4c8-1ff4-7e63-a676-c27fd6e47abd",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-all-is-well",
  ownLength: 2.822,
  ownProgress: 2.822,
  partOfCollections: ["release/paul-cardall-ancestors"],
  status: "completed",
  unit: "unit/minutes",
  title: "All Is Well",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "alliswell|7FQRbf8gbKw8KZQZAJWxH2|169320",
  song: "song/paul-cardall-all-is-well",
  carriedBy: [
    {
      release: "release/paul-cardall-ancestors",
      discNumber: 1,
      position: 13,
      externalId: "2AyCNfJNdFWBikXDqzNqGX",
      externalLink: "https://open.spotify.com/track/2AyCNfJNdFWBikXDqzNqGX",
    },
  ],
} as const satisfies Track
