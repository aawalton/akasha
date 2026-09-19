import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedForgetHer = {
  id: "01a0b724-d1bc-70f1-848f-22f23b194dd2",
  type: "page-type/song",
  slug: "girl-in-red-forget-her",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "36801150-0472-4f91-a203-35466423bb27",
      externalLink: "https://musicbrainz.org/work/36801150-0472-4f91-a203-35466423bb27",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "forget her",
  artist: "artist/girl-in-red",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
