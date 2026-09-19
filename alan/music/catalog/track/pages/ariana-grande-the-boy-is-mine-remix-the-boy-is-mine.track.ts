import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeTheBoyIsMineRemixTheBoyIsMine = {
  id: "01a0a6c5-3377-7aff-bab5-9227b941bb2d",
  type: "page-type/track",
  slug: "ariana-grande-the-boy-is-mine-remix-the-boy-is-mine",
  ownLength: 2.8939833333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-the-boy-is-mine-remix"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4wZWAStC9iUk5VvtiYgwzV",
      externalLink: "https://open.spotify.com/track/4wZWAStC9iUk5VvtiYgwzV",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "the boy is mine",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "theboyismine|66CXWjxzNUsdJxJ2JdwvnR|173639",
  song: "song/ariana-grande-the-boy-is-mine",
} as const satisfies Track
