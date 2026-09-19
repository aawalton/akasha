import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraHome = {
  id: "019ea4a7-3b6c-7b9b-8ad0-35c1f2670f8a",
  type: "page-type/song",
  slug: "aurora-home",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d47bfc98-821f-4fda-b4d7-322f4dc359c6",
      externalLink: "https://musicbrainz.org/work/d47bfc98-821f-4fda-b4d7-322f4dc359c6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Home",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
