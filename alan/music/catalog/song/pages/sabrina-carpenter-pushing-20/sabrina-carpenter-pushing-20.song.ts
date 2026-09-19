import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterPushing20 = {
  id: "01a0b723-c17d-7a80-9be0-0c504c93c79f",
  type: "page-type/song",
  slug: "sabrina-carpenter-pushing-20",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2392f96e-4e83-492b-8146-bf3177b47609",
      externalLink: "https://musicbrainz.org/work/2392f96e-4e83-492b-8146-bf3177b47609",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Pushing 20",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
