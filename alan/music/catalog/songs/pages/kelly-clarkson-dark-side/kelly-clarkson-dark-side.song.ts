import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const kellyClarksonDarkSide = {
  id: "019ea4af-6dc7-78fa-b87d-9d03aec7631e",
  type: "song",
  slug: "kelly-clarkson-dark-side",
  title: "Dark Side",
  artist: "kelly-clarkson",
  externalId: "94989661-0467-48d3-b501-96fb4fef21dc",
  externalLink: "https://musicbrainz.org/work/94989661-0467-48d3-b501-96fb4fef21dc",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
