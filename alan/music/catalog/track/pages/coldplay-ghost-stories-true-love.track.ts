import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGhostStoriesTrueLove = {
  id: "01a0b9ee-d88b-7300-881b-67d34fe59ed2",
  type: "page-type/track",
  slug: "coldplay-ghost-stories-true-love",
  ownLength: 4.1,
  ownProgress: 4.1,
  partOfCollections: ["release/coldplay-ghost-stories", "release/coldplay-true-love"],
  status: "completed",
  unit: "unit/minutes",
  title: "True Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "truelove|4gzpq5DPGxSnKTe4SA8HAU|246000",
  song: "song/coldplay-true-love",
  carriedBy: [
    {
      release: "release/coldplay-ghost-stories",
      discNumber: 1,
      position: 4,
      externalId: "0fQuzbQNLcD1ofo7B2NcFI",
      externalLink: "https://open.spotify.com/track/0fQuzbQNLcD1ofo7B2NcFI",
    },
    {
      release: "release/coldplay-true-love",
      discNumber: 1,
      position: 1,
      externalId: "3HOe5HB3E9tmz9ocHwsPgP",
      externalLink: "https://open.spotify.com/track/3HOe5HB3E9tmz9ocHwsPgP",
    },
  ],
} as const satisfies Track
