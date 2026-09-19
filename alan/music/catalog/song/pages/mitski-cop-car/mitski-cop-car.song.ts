import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiCopCar = {
  id: "019f0ea7-a808-7649-9fb7-3f9ca43fe2f5",
  type: "page-type/song",
  slug: "mitski-cop-car",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e3ad9a52-ec65-403d-89ce-f92066a91cb9",
      externalLink: "https://musicbrainz.org/work/e3ad9a52-ec65-403d-89ce-f92066a91cb9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cop Car",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
