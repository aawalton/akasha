import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonWhatSUpLonely = {
  id: "019ea4b1-bdb9-7ec1-9dab-f1c2cbaa4b4a",
  type: "page-type/song",
  slug: "kelly-clarkson-what-s-up-lonely",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "232e552d-ca0b-469e-a5d9-837992395176",
      externalLink: "https://musicbrainz.org/work/232e552d-ca0b-469e-a5d9-837992395176",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "What’s Up Lonely",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
