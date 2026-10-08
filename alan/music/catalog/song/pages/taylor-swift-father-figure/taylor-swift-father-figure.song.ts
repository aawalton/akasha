import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftFatherFigure = {
  id: "019ea416-26bc-7544-bfde-f304ab7ce8c4",
  type: "page-type/song",
  slug: "taylor-swift-father-figure",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a3c82135-d292-4687-9728-4efde74b0216",
      externalLink: "https://musicbrainz.org/work/a3c82135-d292-4687-9728-4efde74b0216",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Father Figure",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:15.676Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
