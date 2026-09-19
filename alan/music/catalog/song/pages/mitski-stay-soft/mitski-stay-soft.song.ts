import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiStaySoft = {
  id: "019f0e9e-80ae-7705-98e2-e2e8d6ed9ad2",
  type: "page-type/song",
  slug: "mitski-stay-soft",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "341751bd-93fd-4d60-a8be-0587a2c5c232",
      externalLink: "https://musicbrainz.org/work/341751bd-93fd-4d60-a8be-0587a2c5c232",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Stay Soft",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
