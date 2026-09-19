import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBrandNewYou = {
  id: "019ea4e3-626b-7f4d-a792-fcf27eb9532f",
  type: "page-type/song",
  slug: "ariana-grande-brand-new-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d86a28a4-984a-4137-b1dd-04a886afaef2",
      externalLink: "https://musicbrainz.org/work/d86a28a4-984a-4137-b1dd-04a886afaef2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Brand New You",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
