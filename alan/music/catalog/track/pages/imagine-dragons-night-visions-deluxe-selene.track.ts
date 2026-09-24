import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeSelene = {
  id: "01a0c43f-d8d5-7157-9b41-4158d5ad9217",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-selene",
  ownLength: 4.0011,
  ownProgress: 4.0011,
  partOfCollections: ["release/imagine-dragons-night-visions-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Selene",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "selene|53XhwfbYqKCa1cC15pYq2q|240066",
  song: "song/imagine-dragons-selene",
  carriedBy: [
    {
      release: "release/imagine-dragons-night-visions-deluxe",
      discNumber: 1,
      position: 16,
      externalId: "2TaTzAv5PQxDbfjvS7KWXB",
      externalLink: "https://open.spotify.com/track/2TaTzAv5PQxDbfjvS7KWXB",
    },
  ],
} as const satisfies Track
