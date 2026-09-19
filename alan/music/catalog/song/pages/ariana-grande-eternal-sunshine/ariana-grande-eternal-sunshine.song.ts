import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeEternalSunshine = {
  id: "019ea4e0-81e8-75a7-b3a2-0691e951b9b1",
  type: "page-type/song",
  slug: "ariana-grande-eternal-sunshine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "10138ca6-66ca-407b-8ba0-8f754796ff07",
      externalLink: "https://musicbrainz.org/work/10138ca6-66ca-407b-8ba0-8f754796ff07",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "eternal sunshine",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
