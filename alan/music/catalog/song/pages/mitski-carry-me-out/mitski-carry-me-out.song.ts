import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiCarryMeOut = {
  id: "019f0ea2-131c-7767-b324-ae8b151691ee",
  type: "page-type/song",
  slug: "mitski-carry-me-out",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "76699502-13ed-42ea-b604-018ce4092431",
      externalLink: "https://musicbrainz.org/work/76699502-13ed-42ea-b604-018ce4092431",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Carry Me Out",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
