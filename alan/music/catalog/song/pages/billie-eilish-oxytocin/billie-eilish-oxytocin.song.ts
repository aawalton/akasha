import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishOxytocin = {
  id: "019ea4ab-3fe3-734d-a757-211ade851628",
  type: "page-type/song",
  slug: "billie-eilish-oxytocin",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cbd51937-25cc-4e17-aa0a-f9c733a05ab9",
      externalLink: "https://musicbrainz.org/work/cbd51937-25cc-4e17-aa0a-f9c733a05ab9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Oxytocin",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
