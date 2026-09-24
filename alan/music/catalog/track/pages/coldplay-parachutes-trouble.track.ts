import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayParachutesTrouble = {
  id: "01a0b9ee-e9ee-709f-954d-5df354058447",
  type: "page-type/track",
  slug: "coldplay-parachutes-trouble",
  ownLength: 4.5571,
  ownProgress: 4.5571,
  partOfCollections: ["release/coldplay-parachutes", "release/coldplay-trouble"],
  status: "completed",
  unit: "unit/minutes",
  title: "Trouble",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "trouble|4gzpq5DPGxSnKTe4SA8HAU|273426",
  song: "song/coldplay-trouble",
  carriedBy: [
    {
      release: "release/coldplay-parachutes",
      discNumber: 1,
      position: 6,
      externalId: "0R8P9KfGJCDULmlEoBagcO",
      externalLink: "https://open.spotify.com/track/0R8P9KfGJCDULmlEoBagcO",
    },
    {
      release: "release/coldplay-trouble",
      discNumber: 1,
      position: 1,
      externalId: "7KCYwV1RiwbRnWN7ofzkNL",
      externalLink: "https://open.spotify.com/track/7KCYwV1RiwbRnWN7ofzkNL",
    },
  ],
} as const satisfies Track
