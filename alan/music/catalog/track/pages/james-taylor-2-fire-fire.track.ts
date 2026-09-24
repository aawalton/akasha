import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FireFire = {
  id: "01a0abeb-5066-7625-8b1d-755a0149deb7",
  type: "page-type/track",
  slug: "james-taylor-2-fire-fire",
  ownLength: 5.083333333333333,
  ownProgress: 5.083333333333333,
  partOfCollections: ["release/james-taylor-2-fire"],
  status: "completed",
  unit: "unit/minutes",
  title: "Fire",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }, { artistName: "The New Mastersounds" }],
  trackKey: "fire|0vn7UBvSQECKJm2817Yf1P,1DJVvIcjKhdedkuGRzW7PG|305000",
  song: "song/james-taylor-fire",
  carriedBy: [
    {
      release: "release/james-taylor-2-fire",
      discNumber: 1,
      position: 1,
      externalId: "3cavUWhdiwvVTylTP7j3Y9",
      externalLink: "https://open.spotify.com/track/3cavUWhdiwvVTylTP7j3Y9",
    },
  ],
} as const satisfies Track
