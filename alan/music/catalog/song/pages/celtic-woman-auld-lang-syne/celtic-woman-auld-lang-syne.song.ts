import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanAuldLangSyne = {
  id: "01a0b720-159a-7f7e-8d6d-4701ae3cb4f0",
  type: "page-type/song",
  slug: "celtic-woman-auld-lang-syne",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e578ab10-5751-3f4a-ae3c-9216ac376336",
      externalLink: "https://musicbrainz.org/work/e578ab10-5751-3f4a-ae3c-9216ac376336",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Auld Lang Syne",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
