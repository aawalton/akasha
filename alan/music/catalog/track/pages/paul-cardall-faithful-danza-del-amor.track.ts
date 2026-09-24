import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulDanzaDelAmor = {
  id: "01a0b4c8-5a2b-7e71-9bf7-75e625172907",
  type: "page-type/track",
  slug: "paul-cardall-faithful-danza-del-amor",
  ownLength: 3.9553333333333334,
  ownProgress: 3.9553333333333334,
  partOfCollections: ["release/paul-cardall-faithful"],
  status: "completed",
  unit: "unit/minutes",
  title: "Danza Del Amor",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "danzadelamor|7FQRbf8gbKw8KZQZAJWxH2|237320",
  song: "song/paul-cardall-danza-del-amor",
  carriedBy: [
    {
      release: "release/paul-cardall-faithful",
      discNumber: 1,
      position: 7,
      externalId: "3ReUJHaFQJrzi4RyWj57vV",
      externalLink: "https://open.spotify.com/track/3ReUJHaFQJrzi4RyWj57vV",
    },
  ],
} as const satisfies Track
