import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiIMYourMan = {
  id: "019f0e9e-9d41-7abf-99d2-1584636e0c18",
  type: "page-type/song",
  slug: "mitski-i-m-your-man",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "364b4b62-b815-443f-8ab3-fd72a5c38227",
      externalLink: "https://musicbrainz.org/work/364b4b62-b815-443f-8ab3-fd72a5c38227",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I’m Your Man",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
