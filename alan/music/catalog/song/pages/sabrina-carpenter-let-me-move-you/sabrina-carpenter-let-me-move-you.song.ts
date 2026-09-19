import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterLetMeMoveYou = {
  id: "01a0b723-d059-7b46-a502-6e081307fc8d",
  type: "page-type/song",
  slug: "sabrina-carpenter-let-me-move-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fc09642d-9e39-491a-a11b-527bde44f862",
      externalLink: "https://musicbrainz.org/work/fc09642d-9e39-491a-a11b-527bde44f862",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let Me Move You",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
