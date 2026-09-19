import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeDearOldShiz = {
  id: "019ea4e3-1475-7526-a9be-3f888b1738d5",
  type: "page-type/song",
  slug: "ariana-grande-dear-old-shiz",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c69d9717-ddc6-4747-951d-09b110af97e5",
      externalLink: "https://musicbrainz.org/work/c69d9717-ddc6-4747-951d-09b110af97e5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dear Old Shiz",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
