import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedYouStupidBitch = {
  id: "01a0b724-d3e0-74c8-9795-37e2a34f999a",
  type: "page-type/song",
  slug: "girl-in-red-you-stupid-bitch",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9331c597-8142-4456-9a4b-17954d34f004",
      externalLink: "https://musicbrainz.org/work/9331c597-8142-4456-9a4b-17954d34f004",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Stupid Bitch",
  artist: "artist/girl-in-red",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
