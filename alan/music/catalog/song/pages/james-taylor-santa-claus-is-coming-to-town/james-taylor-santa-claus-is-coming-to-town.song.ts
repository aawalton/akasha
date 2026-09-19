import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSantaClausIsComingToTown = {
  id: "01a0b72f-5208-734b-a929-ddf45648078f",
  type: "page-type/song",
  slug: "james-taylor-santa-claus-is-coming-to-town",
  partOfCollections: ["artist/sabrina-carpenter"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b3e49473-899d-3f08-9f06-2afc70f85e2e",
      externalLink: "https://musicbrainz.org/work/b3e49473-899d-3f08-9f06-2afc70f85e2e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Santa Claus Is Coming to Town",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
