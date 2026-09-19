import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishSkinny = {
  id: "019ea4ab-91c1-7532-b7df-32c9d588183e",
  type: "page-type/song",
  slug: "billie-eilish-skinny",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d8cc850d-10be-4895-8b2f-eb6cd9dee77c",
      externalLink: "https://musicbrainz.org/work/d8cc850d-10be-4895-8b2f-eb6cd9dee77c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "SKINNY",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
