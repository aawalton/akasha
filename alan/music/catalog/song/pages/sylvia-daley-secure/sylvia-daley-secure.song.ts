import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sylviaDaleySecure = {
  id: "01a0b725-af2d-7035-b079-37bb3a3e9fa4",
  type: "page-type/song",
  slug: "sylvia-daley-secure",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d72042a9-cecc-474c-8410-d061013cca01",
      externalLink: "https://musicbrainz.org/work/d72042a9-cecc-474c-8410-d061013cca01",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Secure",
  artist: "artist/sylvia-daley",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
