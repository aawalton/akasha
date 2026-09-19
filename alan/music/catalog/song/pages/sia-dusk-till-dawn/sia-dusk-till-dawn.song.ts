import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDuskTillDawn = {
  id: "019ea4c4-0188-7839-b7e7-743573ddc7c7",
  type: "page-type/song",
  slug: "sia-dusk-till-dawn",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "63fe5390-3bb0-4754-940b-40a78571ec6f",
      externalLink: "https://musicbrainz.org/work/63fe5390-3bb0-4754-940b-40a78571ec6f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dusk Till Dawn",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
