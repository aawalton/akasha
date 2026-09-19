import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayTroubleInTown = {
  id: "01a0ba60-fcd0-774a-a617-c8b51871a232",
  type: "page-type/song",
  slug: "coldplay-trouble-in-town",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e5c4e5bd-add0-4f14-9b16-2f1806ba2450",
      externalLink: "https://musicbrainz.org/work/e5c4e5bd-add0-4f14-9b16-2f1806ba2450",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Trouble in Town",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
