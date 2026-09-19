import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonFff = {
  id: "019ea49e-e9ce-7d20-9bb6-c7ba6129a97a",
  type: "page-type/song",
  slug: "zara-larsson-fff",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3afbc269-2f46-45e0-b6b3-a2f44d77894a",
      externalLink: "https://musicbrainz.org/work/3afbc269-2f46-45e0-b6b3-a2f44d77894a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "FFF",
  artist: "artist/zara-larsson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
