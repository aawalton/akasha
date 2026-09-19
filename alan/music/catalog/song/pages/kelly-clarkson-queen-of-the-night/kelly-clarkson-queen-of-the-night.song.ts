import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonQueenOfTheNight = {
  id: "019ea4b1-b15d-7c45-9792-b528614b7560",
  type: "page-type/song",
  slug: "kelly-clarkson-queen-of-the-night",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "20e9348e-d961-41da-88e9-b8aa3a7267be",
      externalLink: "https://musicbrainz.org/work/20e9348e-d961-41da-88e9-b8aa3a7267be",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Queen of the Night",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
