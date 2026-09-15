import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftFatherFigure = {
  id: "019ea416-26bc-7544-bfde-f304ab7ce8c4",
  type: "page-type/song",
  slug: "taylor-swift-father-figure",
  title: "Father Figure",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a3c82135-d292-4687-9728-4efde74b0216",
      externalLink: "https://musicbrainz.org/work/a3c82135-d292-4687-9728-4efde74b0216",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
