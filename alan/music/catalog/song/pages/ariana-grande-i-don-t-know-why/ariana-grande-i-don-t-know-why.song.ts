import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeIDonTKnowWhy = {
  id: "019ea4e2-05ba-79e9-b74e-f858c515b526",
  type: "page-type/song",
  slug: "ariana-grande-i-don-t-know-why",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "778b7385-a5e6-367a-8fb8-50143d4ece55",
      externalLink: "https://musicbrainz.org/work/778b7385-a5e6-367a-8fb8-50143d4ece55",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Don’t Know Why",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
