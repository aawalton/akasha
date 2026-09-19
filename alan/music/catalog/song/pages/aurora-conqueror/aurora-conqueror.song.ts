import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraConqueror = {
  id: "019ea4a5-9d12-72c1-830f-5f3802c3077c",
  type: "page-type/song",
  slug: "aurora-conqueror",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "67069a6f-2b9f-48dd-b633-9789792b2072",
      externalLink: "https://musicbrainz.org/work/67069a6f-2b9f-48dd-b633-9789792b2072",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Conqueror",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
