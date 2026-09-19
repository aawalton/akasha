import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraDaydreamer = {
  id: "019ea4a7-5486-7a6c-946a-aee8371287f4",
  type: "page-type/song",
  slug: "aurora-daydreamer",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ea7f5965-a2b1-47fe-af60-ec81ff8d6c6d",
      externalLink: "https://musicbrainz.org/work/ea7f5965-a2b1-47fe-af60-ec81ff8d6c6d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Daydreamer",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
