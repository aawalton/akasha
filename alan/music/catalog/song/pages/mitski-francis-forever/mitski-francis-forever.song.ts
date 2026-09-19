import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiFrancisForever = {
  id: "019f0e9c-cfe1-72b9-9447-a0bf20be179b",
  type: "page-type/song",
  slug: "mitski-francis-forever",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "17e2835b-67e8-41a9-a118-5968268fa04d",
      externalLink: "https://musicbrainz.org/work/17e2835b-67e8-41a9-a118-5968268fa04d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Francis Forever",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
