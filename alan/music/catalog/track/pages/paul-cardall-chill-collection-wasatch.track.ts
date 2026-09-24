import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionWasatch = {
  id: "01a0b4c8-465d-7fce-bd66-0f66a9f57c64",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-wasatch",
  ownLength: 3.60925,
  ownProgress: 3.60925,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "Wasatch",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "wasatch|7FQRbf8gbKw8KZQZAJWxH2|216555",
  song: "song/paul-cardall-wasatch",
  carriedBy: [
    {
      release: "release/paul-cardall-chill-collection",
      discNumber: 1,
      position: 14,
      externalId: "0wxIiI84nGdKiahikYCuwy",
      externalLink: "https://open.spotify.com/track/0wxIiI84nGdKiahikYCuwy",
    },
  ],
} as const satisfies Track
