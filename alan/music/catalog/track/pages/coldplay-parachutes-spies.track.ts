import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayParachutesSpies = {
  id: "01a0b9ee-e974-7af0-8387-f7b771924ad1",
  type: "page-type/track",
  slug: "coldplay-parachutes-spies",
  ownLength: 5.312883333333334,
  ownProgress: 5.312883333333334,
  partOfCollections: ["release/coldplay-parachutes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Spies",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "spies|4gzpq5DPGxSnKTe4SA8HAU|318773",
  song: "song/coldplay-spies",
  carriedBy: [
    {
      release: "release/coldplay-parachutes",
      discNumber: 1,
      position: 3,
      externalId: "2mLgOcRkEgq89j8WstUpui",
      externalLink: "https://open.spotify.com/track/2mLgOcRkEgq89j8WstUpui",
    },
  ],
} as const satisfies Track
