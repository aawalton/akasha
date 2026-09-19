import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayGlassOfWater = {
  id: "01a0ba5d-3ae0-701b-a343-19db672a7572",
  type: "page-type/song",
  slug: "coldplay-glass-of-water",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2a9e8eb7-8be4-3e31-a974-6a2b484c0e10",
      externalLink: "https://musicbrainz.org/work/2a9e8eb7-8be4-3e31-a974-6a2b484c0e10",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Glass of Water",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
