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
} as const satisfies Song
