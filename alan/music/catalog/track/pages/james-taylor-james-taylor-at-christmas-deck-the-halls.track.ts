import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylorJamesTaylorAtChristmasDeckTheHalls = {
  id: "01a0abeb-2dfa-7881-abc2-498b90a1c154",
  type: "page-type/track",
  slug: "james-taylor-james-taylor-at-christmas-deck-the-halls",
  ownLength: 2.847766666666667,
  ownProgress: 2.847766666666667,
  partOfCollections: ["release/james-taylor-james-taylor-at-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Deck The Halls",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "deckthehalls|0vn7UBvSQECKJm2817Yf1P|170866",
  song: "song/james-taylor-deck-the-halls",
  carriedBy: [
    {
      release: "release/james-taylor-james-taylor-at-christmas",
      discNumber: 1,
      position: 15,
      externalId: "20s0YwMEKaD47u83q3nMJO",
      externalLink: "https://open.spotify.com/track/20s0YwMEKaD47u83q3nMJO",
    },
  ],
} as const satisfies Track
