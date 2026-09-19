import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioInferior = {
  id: "019ea4f7-dcd6-7c74-a50e-64f7c2baae75",
  type: "page-type/song",
  slug: "jessica-baio-inferior",
  title: "inferior",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7412d2f5-05ab-4626-9143-8523f7a92137",
      externalLink: "https://musicbrainz.org/recording/7412d2f5-05ab-4626-9143-8523f7a92137",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
