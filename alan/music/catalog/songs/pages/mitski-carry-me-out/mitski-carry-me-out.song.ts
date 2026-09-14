import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const mitskiCarryMeOut = {
  id: "019f0ea2-131c-7767-b324-ae8b151691ee",
  type: "song",
  slug: "mitski-carry-me-out",
  title: "Carry Me Out",
  artist: "artist/mitski",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "76699502-13ed-42ea-b604-018ce4092431",
      externalLink: "https://musicbrainz.org/work/76699502-13ed-42ea-b604-018ce4092431",
      lastSyncedAt: "2026-06-28",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
