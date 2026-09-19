import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsHearMe = {
  id: "019ea498-a0bc-78e5-906a-285bf8268493",
  type: "page-type/song",
  slug: "imagine-dragons-hear-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "693340eb-cf1e-4911-bba8-326488b3c56b",
      externalLink: "https://musicbrainz.org/work/693340eb-cf1e-4911-bba8-326488b3c56b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hear Me",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
