import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineDeluxeBrighterDaysAheadACappellaVersionWeCantBeFriends2 = {
  id: "01a0a6c5-4267-74da-a691-c090cfc1f842",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-deluxe-brighter-days-ahead-a-cappella-version-we-cant-be-friends-2",
  ownLength: 3.537,
  ownProgress: 3.537,
  partOfCollections: [
    "release/ariana-grande-eternal-sunshine-deluxe-brighter-days-ahead-a-cappella-version",
    "release/ariana-grande-we-can-t-be-friends-wait-for-your-love",
  ],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "291MSJpaIvBjWbXYTv5p9z",
      externalLink: "https://open.spotify.com/track/291MSJpaIvBjWbXYTv5p9z",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "we can't be friends (wait for your love) - a cappella",
  trackType: "a-cappella",
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "wecantbefriendswaitforyourloveacappella|66CXWjxzNUsdJxJ2JdwvnR|212220",
  song: "song/ariana-grande-we-can-t-be-friends-wait-for-your-love",
  carriedBy: [
    {
      release:
        "release/ariana-grande-eternal-sunshine-deluxe-brighter-days-ahead-a-cappella-version",
      discNumber: 1,
      position: 29,
      externalId: "291MSJpaIvBjWbXYTv5p9z",
      externalLink: "https://open.spotify.com/track/291MSJpaIvBjWbXYTv5p9z",
    },
    {
      release: "release/ariana-grande-we-can-t-be-friends-wait-for-your-love",
      discNumber: 1,
      position: 2,
      externalId: "0ok5poABoeVlhVJkS6bvn3",
      externalLink: "https://open.spotify.com/track/0ok5poABoeVlhVJkS6bvn3",
    },
  ],
} as const satisfies Track
