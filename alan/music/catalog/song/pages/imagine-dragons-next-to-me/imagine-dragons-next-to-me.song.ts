import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsNextToMe = {
  id: "019ea497-67c3-723d-a904-05d679f697de",
  type: "page-type/song",
  slug: "imagine-dragons-next-to-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "365ae867-694f-4abe-93b6-8aae47e9d599",
      externalLink: "https://musicbrainz.org/work/365ae867-694f-4abe-93b6-8aae47e9d599",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Next to Me",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
