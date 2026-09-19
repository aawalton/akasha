import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraYouKeepMeCrawling = {
  id: "019ea4a7-cc72-7343-83e5-58363f2bd12d",
  type: "page-type/song",
  slug: "aurora-you-keep-me-crawling",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "38ea70b2-f2ea-4c3e-9cad-b45febb15301",
      externalLink: "https://musicbrainz.org/work/38ea70b2-f2ea-4c3e-9cad-b45febb15301",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Keep Me Crawling",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
