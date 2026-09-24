import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FireFoxyLady = {
  id: "01a0abeb-508c-7c9b-a8c0-caeb7d6cab7f",
  type: "page-type/track",
  slug: "james-taylor-2-fire-foxy-lady",
  ownLength: 4.983333333333333,
  ownProgress: 4.983333333333333,
  partOfCollections: ["release/james-taylor-2-fire"],
  status: "completed",
  unit: "unit/minutes",
  title: "Foxy Lady",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }, { artistName: "The New Mastersounds" }],
  trackKey: "foxylady|0vn7UBvSQECKJm2817Yf1P,1DJVvIcjKhdedkuGRzW7PG|299000",
  song: "song/james-taylor-foxy-lady",
  carriedBy: [
    {
      release: "release/james-taylor-2-fire",
      discNumber: 1,
      position: 2,
      externalId: "5DM5WjP3EslUWgJaOpGGmT",
      externalLink: "https://open.spotify.com/track/5DM5WjP3EslUWgJaOpGGmT",
    },
  ],
} as const satisfies Track
