import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiLightning = {
  id: "019f0e9c-9489-7d1e-a1dc-06626b62fd02",
  type: "page-type/song",
  slug: "mitski-lightning",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "11932468-b3cc-4d58-b3b8-a1aef9600039",
      externalLink: "https://musicbrainz.org/work/11932468-b3cc-4d58-b3b8-a1aef9600039",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lightning",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
