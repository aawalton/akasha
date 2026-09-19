import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiGeyser = {
  id: "019f0ea2-d4dd-70d9-9369-945121d95255",
  type: "page-type/song",
  slug: "mitski-geyser",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "83913eb5-6889-4d8a-85d8-19dc71f6a0c9",
      externalLink: "https://musicbrainz.org/work/83913eb5-6889-4d8a-85d8-19dc71f6a0c9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Geyser",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
