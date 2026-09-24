import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessPerfect = {
  id: "01a0afa2-0eda-7fbd-8000-0da955a8f5ed",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-perfect",
  ownLength: 5.167983333333333,
  ownProgress: 5.167983333333333,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  status: "completed",
  unit: "unit/minutes",
  title: "Perfect",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "perfect|0jW6R8CVyVohuUJVcuweDI|310079",
  song: "song/the-piano-guys-perfect",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-limitless",
      discNumber: 1,
      position: 8,
      externalId: "3WDjj4qNiMlArMHZFt9WyQ",
      externalLink: "https://open.spotify.com/track/3WDjj4qNiMlArMHZFt9WyQ",
    },
  ],
} as const satisfies Track
