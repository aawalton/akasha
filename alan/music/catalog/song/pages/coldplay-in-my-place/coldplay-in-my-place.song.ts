import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayInMyPlace = {
  id: "01a0ba5d-3ea5-7839-a19f-77fc6f34023d",
  type: "page-type/song",
  slug: "coldplay-in-my-place",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "73787af6-ba89-34ad-97d6-ee3f206ac661",
      externalLink: "https://musicbrainz.org/work/73787af6-ba89-34ad-97d6-ee3f206ac661",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "In My Place",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
