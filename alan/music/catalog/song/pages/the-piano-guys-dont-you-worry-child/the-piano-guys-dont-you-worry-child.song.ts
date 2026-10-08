import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysDontYouWorryChild = {
  id: "01a0b71e-9e19-7352-8461-e0b7e6342d64",
  type: "page-type/song",
  slug: "the-piano-guys-dont-you-worry-child",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d34baf91-129d-46a9-9ee3-fa5d1424cf7d",
      externalLink: "https://musicbrainz.org/work/d34baf91-129d-46a9-9ee3-fa5d1424cf7d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t You Worry Child",
  artist: "artist/the-piano-guys",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T00:43:52.217Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
