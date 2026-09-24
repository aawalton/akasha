import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionDanzaDelAmor = {
  id: "01a0b4c8-45f7-7e77-bfd3-270a8b6530f6",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-danza-del-amor",
  ownLength: 3.9562333333333335,
  ownProgress: 3.9562333333333335,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "Danza Del Amor",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "danzadelamor|7FQRbf8gbKw8KZQZAJWxH2|237374",
  song: "song/paul-cardall-danza-del-amor",
  carriedBy: [
    {
      release: "release/paul-cardall-chill-collection",
      discNumber: 1,
      position: 11,
      externalId: "0uiEkbI69LuCvxNp2Nagop",
      externalLink: "https://open.spotify.com/track/0uiEkbI69LuCvxNp2Nagop",
    },
  ],
} as const satisfies Track
