import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylorJamesTaylorAtChristmasJingleBells = {
  id: "01a0abeb-2ca0-74e0-a450-f4383ed6c122",
  type: "page-type/track",
  slug: "james-taylor-james-taylor-at-christmas-jingle-bells",
  ownLength: 3.88155,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-james-taylor-at-christmas"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1CaStRZxso3iWWLzUFfjUL",
      externalLink: "https://open.spotify.com/track/1CaStRZxso3iWWLzUFfjUL",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Jingle Bells",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "jinglebells|0vn7UBvSQECKJm2817Yf1P|232893",
  song: "song/james-taylor-jingle-bells",
} as const satisfies Track
