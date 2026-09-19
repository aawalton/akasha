import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylorJamesTaylorAtChristmasDeckTheHalls = {
  id: "01a0abeb-2dfa-7881-abc2-498b90a1c154",
  type: "page-type/track",
  slug: "james-taylor-james-taylor-at-christmas-deck-the-halls",
  ownLength: 2.847766666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-james-taylor-at-christmas"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "20s0YwMEKaD47u83q3nMJO",
      externalLink: "https://open.spotify.com/track/20s0YwMEKaD47u83q3nMJO",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Deck The Halls",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "deckthehalls|0vn7UBvSQECKJm2817Yf1P|170866",
  song: "song/james-taylor-deck-the-halls",
} as const satisfies Track
