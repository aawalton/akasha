import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayOrphans = {
  id: "01a0ba5d-4a96-7063-9e74-3b44ff81fec0",
  type: "page-type/song",
  slug: "coldplay-orphans",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "05475007-5ec3-4dab-8feb-6507ba8cb3e3",
      externalLink: "https://musicbrainz.org/work/05475007-5ec3-4dab-8feb-6507ba8cb3e3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Orphans",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
