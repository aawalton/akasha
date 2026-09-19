import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeMyHeartBelongsToDaddy = {
  id: "019ea4e8-96aa-73fb-a32b-731433862eb9",
  type: "page-type/song",
  slug: "ariana-grande-my-heart-belongs-to-daddy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f913cde7-5418-3a1d-bbe5-01f1b65c688e",
      externalLink: "https://musicbrainz.org/work/f913cde7-5418-3a1d-bbe5-01f1b65c688e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Heart Belongs to Daddy",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
