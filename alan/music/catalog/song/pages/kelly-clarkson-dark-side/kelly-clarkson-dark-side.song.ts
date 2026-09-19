import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonDarkSide = {
  id: "019ea4af-6dc7-78fa-b87d-9d03aec7631e",
  type: "page-type/song",
  slug: "kelly-clarkson-dark-side",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "94989661-0467-48d3-b501-96fb4fef21dc",
      externalLink: "https://musicbrainz.org/work/94989661-0467-48d3-b501-96fb4fef21dc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dark Side",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
