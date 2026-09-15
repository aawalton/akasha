import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeIDonTKnowWhy = {
  id: "019ea4e2-05ba-79e9-b74e-f858c515b526",
  type: "song",
  slug: "ariana-grande-i-don-t-know-why",
  title: "I Don’t Know Why",
  artist: "artist/ariana-grande",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "778b7385-a5e6-367a-8fb8-50143d4ece55",
      externalLink: "https://musicbrainz.org/work/778b7385-a5e6-367a-8fb8-50143d4ece55",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
} as const satisfies Song
