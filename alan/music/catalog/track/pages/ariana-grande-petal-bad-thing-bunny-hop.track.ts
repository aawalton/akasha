import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalBadThingBunnyHop = {
  id: "01a0a6c5-0529-7d21-8d90-030258b35577",
  type: "page-type/track",
  slug: "ariana-grande-petal-bad-thing-bunny-hop",
  ownLength: 3.4670666666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-petal"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4zmXWmILSBkn7gTvIyCiNi",
      externalLink: "https://open.spotify.com/track/4zmXWmILSBkn7gTvIyCiNi",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "bad thing (bunny hop)",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "badthingbunnyhop|66CXWjxzNUsdJxJ2JdwvnR|208024",
  song: "song/ariana-grande-bad-thing-bunny-hop",
} as const satisfies Track
