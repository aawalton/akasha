import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxIceAgeIceAge = {
  id: "01a0c95e-01b3-73af-afa5-8fb0882ff394",
  type: "page-type/track",
  slug: "lilith-max-ice-age-ice-age",
  ownLength: 3.141183333333333,
  ownProgress: 3.141183333333333,
  partOfCollections: ["release/lilith-max-ice-age"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ice Age",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "797SPxZf82IYq3XCM8c9AM", artistName: "Lilith Max" }],
  trackKey: "iceage|797SPxZf82IYq3XCM8c9AM|188471",
  song: "song/lilith-max-ice-age",
  carriedBy: [
    {
      release: "release/lilith-max-ice-age",
      discNumber: 1,
      position: 1,
      externalId: "26M8PQI8MkGRXBIygLlnVF",
      externalLink: "https://open.spotify.com/track/26M8PQI8MkGRXBIygLlnVF",
    },
  ],
} as const satisfies Track
