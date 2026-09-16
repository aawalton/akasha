import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylorJamesTaylorAtChristmasWhoComesThisNight = {
  id: "01a0abeb-2d66-7eb2-9ba5-6f8b6df644eb",
  type: "page-type/track",
  slug: "james-taylor-james-taylor-at-christmas-who-comes-this-night",
  ownLength: 4.166883333333334,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-james-taylor-at-christmas"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3jwg2SQAmvywVvK0ASpgyL",
      externalLink: "https://open.spotify.com/track/3jwg2SQAmvywVvK0ASpgyL",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Who Comes This Night",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "whocomesthisnight|0vn7UBvSQECKJm2817Yf1P|250013",
} as const satisfies Track
