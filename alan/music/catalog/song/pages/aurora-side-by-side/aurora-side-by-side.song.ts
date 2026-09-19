import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraSideBySide = {
  id: "019ea4a5-156c-7f71-bd4c-9d5f7743509b",
  type: "page-type/song",
  slug: "aurora-side-by-side",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "54071568-fdbe-4a91-8eea-223c157b345a",
      externalLink: "https://musicbrainz.org/work/54071568-fdbe-4a91-8eea-223c157b345a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "SIDE BY SIDE",
  artist: "artist/aurora",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
