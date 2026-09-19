import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiThatSOurLamp = {
  id: "019f0e9d-3644-7ca3-b813-eb6bb0ceddf0",
  type: "page-type/song",
  slug: "mitski-that-s-our-lamp",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1a4fe9b1-e91d-4ca4-888a-3dea2aede925",
      externalLink: "https://musicbrainz.org/work/1a4fe9b1-e91d-4ca4-888a-3dea2aede925",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "That’s Our Lamp",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
