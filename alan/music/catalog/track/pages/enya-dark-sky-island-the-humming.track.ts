import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaDarkSkyIslandTheHumming = {
  id: "01a14a1d-db4d-7471-a629-3259f75acf8d",
  type: "page-type/track",
  slug: "enya-dark-sky-island-the-humming",
  ownLength: 3.752,
  ownProgress: 3.752,
  partOfCollections: ["release/enya-dark-sky-island", "release/enya-dark-sky-island-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Humming",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "thehumming|6uothxMWeLWIhsGeF7cyo4|225120",
  song: "song/enya-the-humming",
  carriedBy: [
    {
      release: "release/enya-dark-sky-island",
      discNumber: 1,
      position: 1,
      externalId: "15Zt4Z0N6JMwyNp1vLQNfi",
      externalLink: "https://open.spotify.com/track/15Zt4Z0N6JMwyNp1vLQNfi",
    },
    {
      release: "release/enya-dark-sky-island-deluxe",
      discNumber: 1,
      position: 1,
      externalId: "7HrioB2CowXRcHIERwNCZ7",
      externalLink: "https://open.spotify.com/track/7HrioB2CowXRcHIERwNCZ7",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T14:00:54.619Z",
} as const satisfies Track
