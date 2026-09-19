import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayEveryTeardropIsAWaterfall = {
  id: "01a0ba5d-41db-7e3e-b838-6869c480dc1f",
  type: "page-type/song",
  slug: "coldplay-every-teardrop-is-a-waterfall",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "91297664-3e5e-4516-bb1d-7389b17732d7",
      externalLink: "https://musicbrainz.org/work/91297664-3e5e-4516-bb1d-7389b17732d7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Every Teardrop Is a Waterfall",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
