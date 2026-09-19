import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayForYou = {
  id: "01a0ba5d-4005-7537-8e16-14135cf811b5",
  type: "page-type/song",
  slug: "coldplay-for-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "82773dda-6ea9-492d-bd26-c58edbd2c85e",
      externalLink: "https://musicbrainz.org/work/82773dda-6ea9-492d-bd26-c58edbd2c85e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "For You",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
