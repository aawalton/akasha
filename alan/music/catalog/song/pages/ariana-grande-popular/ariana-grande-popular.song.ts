import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandePopular = {
  id: "019ea4e4-212f-7943-af1c-e64ecccd2cb4",
  type: "page-type/song",
  slug: "ariana-grande-popular",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "15953bcf-9ab2-3dc5-8f74-477eb6766122",
      externalLink: "https://musicbrainz.org/work/15953bcf-9ab2-3dc5-8f74-477eb6766122",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Popular",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
