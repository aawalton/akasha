import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylorJamesTaylorAtChristmasWhoComesThisNight = {
  id: "01a0abeb-2d66-7eb2-9ba5-6f8b6df644eb",
  type: "page-type/track",
  slug: "james-taylor-james-taylor-at-christmas-who-comes-this-night",
  ownLength: 4.166883333333334,
  ownProgress: 4.166883333333334,
  partOfCollections: ["release/james-taylor-james-taylor-at-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Who Comes This Night",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "whocomesthisnight|0vn7UBvSQECKJm2817Yf1P|250013",
  song: "song/james-taylor-who-comes-this-night",
  carriedBy: [
    {
      release: "release/james-taylor-james-taylor-at-christmas",
      discNumber: 1,
      position: 10,
      externalId: "3jwg2SQAmvywVvK0ASpgyL",
      externalLink: "https://open.spotify.com/track/3jwg2SQAmvywVvK0ASpgyL",
    },
  ],
} as const satisfies Track
