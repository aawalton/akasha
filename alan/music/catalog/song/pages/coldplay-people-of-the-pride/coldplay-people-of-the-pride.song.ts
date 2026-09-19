import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayPeopleOfThePride = {
  id: "01a0ba5d-5206-76d1-84d8-07ebbf76f74f",
  type: "page-type/song",
  slug: "coldplay-people-of-the-pride",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5cef8350-dd3a-4ed3-86dd-eebd10da3291",
      externalLink: "https://musicbrainz.org/work/5cef8350-dd3a-4ed3-86dd-eebd10da3291",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "People of the Pride",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
