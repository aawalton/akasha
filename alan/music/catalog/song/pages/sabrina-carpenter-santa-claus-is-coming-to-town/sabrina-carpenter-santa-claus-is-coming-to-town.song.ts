import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterSantaClausIsComingToTown = {
  id: "01a0b723-d76e-744a-99bc-59ccb8e06e0b",
  type: "page-type/song",
  slug: "sabrina-carpenter-santa-claus-is-coming-to-town",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b3e49473-899d-3f08-9f06-2afc70f85e2e",
      externalLink: "https://musicbrainz.org/work/b3e49473-899d-3f08-9f06-2afc70f85e2e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Santa Claus Is Coming to Town",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
