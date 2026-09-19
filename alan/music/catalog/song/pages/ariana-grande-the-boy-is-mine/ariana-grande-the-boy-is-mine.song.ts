import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTheBoyIsMine = {
  id: "019ea4e6-35c0-7b41-86c8-321b11ec8f51",
  type: "page-type/song",
  slug: "ariana-grande-the-boy-is-mine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "83e9c955-4a35-4d35-93fd-9b51598e3036",
      externalLink: "https://musicbrainz.org/work/83e9c955-4a35-4d35-93fd-9b51598e3036",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Boy Is Mine",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
