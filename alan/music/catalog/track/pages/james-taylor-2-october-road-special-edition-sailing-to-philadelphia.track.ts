import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2OctoberRoadSpecialEditionSailingToPhiladelphia = {
  id: "01a0abeb-39b4-7778-944a-dc1871ac1f67",
  type: "page-type/track",
  slug: "james-taylor-2-october-road-special-edition-sailing-to-philadelphia",
  ownLength: 5.481766666666666,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-october-road-special-edition"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3SSdgcic8a3hVaPytpQsiJ",
      externalLink: "https://open.spotify.com/track/3SSdgcic8a3hVaPytpQsiJ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Sailing To Philadelphia",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" },
    { externalId: "0FI0kxP0BWurTz8cB8BBug", artistName: "Mark Knopfler" },
  ],
  trackKey: "sailingtophiladelphia|0FI0kxP0BWurTz8cB8BBug,0vn7UBvSQECKJm2817Yf1P|328906",
  song: "song/james-taylor-sailing-to-philadelphia",
} as const satisfies Track
