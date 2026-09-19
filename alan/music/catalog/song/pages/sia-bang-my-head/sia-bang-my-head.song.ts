import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBangMyHead = {
  id: "019ea4c4-a505-7e70-89f1-e8d9f1a19fd0",
  type: "page-type/song",
  slug: "sia-bang-my-head",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "86337cb8-0fc7-49d9-930a-cc119ce76b88",
      externalLink: "https://musicbrainz.org/work/86337cb8-0fc7-49d9-930a-cc119ce76b88",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bang My Head",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
