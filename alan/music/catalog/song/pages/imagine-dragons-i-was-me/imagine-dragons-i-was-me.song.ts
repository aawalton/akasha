import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsIWasMe = {
  id: "019ea497-039b-7aa7-a02f-f313a3da2a75",
  type: "song",
  slug: "imagine-dragons-i-was-me",
  title: "I Was Me",
  artist: "artist/imagine-dragons",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1dfa86bc-dbc9-4da3-9e5c-758faad3e8a8",
      externalLink: "https://musicbrainz.org/work/1dfa86bc-dbc9-4da3-9e5c-758faad3e8a8",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
