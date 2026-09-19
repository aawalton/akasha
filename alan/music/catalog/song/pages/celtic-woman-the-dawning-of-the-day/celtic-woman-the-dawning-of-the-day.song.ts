import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheDawningOfTheDay = {
  id: "01a0b720-0f91-7b28-ac79-e604d8f01191",
  type: "page-type/song",
  slug: "celtic-woman-the-dawning-of-the-day",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "84917987-d29e-41d6-ac93-2d6da1734940",
      externalLink: "https://musicbrainz.org/work/84917987-d29e-41d6-ac93-2d6da1734940",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Dawning of the Day",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
