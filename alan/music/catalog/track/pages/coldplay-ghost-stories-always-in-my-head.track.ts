import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGhostStoriesAlwaysInMyHead = {
  id: "01a0b9ee-d80d-7cfa-bfd5-75af3e3ed762",
  type: "page-type/track",
  slug: "coldplay-ghost-stories-always-in-my-head",
  ownLength: 3.6104333333333334,
  ownProgress: 3.6104333333333334,
  partOfCollections: ["release/coldplay-ghost-stories"],
  status: "completed",
  unit: "unit/minutes",
  title: "Always in My Head",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "alwaysinmyhead|4gzpq5DPGxSnKTe4SA8HAU|216626",
  song: "song/coldplay-always-in-my-head",
  carriedBy: [
    {
      release: "release/coldplay-ghost-stories",
      discNumber: 1,
      position: 1,
      externalId: "0FMjqbY3aWo1QDbo3GwXib",
      externalLink: "https://open.spotify.com/track/0FMjqbY3aWo1QDbo3GwXib",
    },
  ],
} as const satisfies Track
