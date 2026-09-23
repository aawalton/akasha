import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreForewordBirdCageBlueAndYellow = {
  id: "01a0ce87-11c8-79cf-8b1a-533bd5d53666",
  type: "page-type/track",
  slug: "yaelokre-foreword-bird-cage-blue-and-yellow",
  ownLength: 2.0631,
  ownProgress: 0,
  partOfCollections: ["release/yaelokre-foreword"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Bird cage blue and yellow",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "3rRyfgGByetsaaujkjQ7rY", artistName: "Yaelokre" },
    { externalId: "5nS4Ohh7IG844fp1Eu1GMI", artistName: "Keath Ósk" },
  ],
  trackKey: "birdcageblueandyellow|3rRyfgGByetsaaujkjQ7rY,5nS4Ohh7IG844fp1Eu1GMI|123786",
  song: "song/yaelokre-bird-cage-blue-and-yellow",
  carriedBy: [
    {
      release: "release/yaelokre-foreword",
      discNumber: 1,
      position: 6,
      externalId: "01tJVEUwNAGExvnUzNQngx",
      externalLink: "https://open.spotify.com/track/01tJVEUwNAGExvnUzNQngx",
    },
  ],
} as const satisfies Track
