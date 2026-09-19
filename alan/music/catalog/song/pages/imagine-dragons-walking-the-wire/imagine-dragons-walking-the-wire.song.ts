import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsWalkingTheWire = {
  id: "019ea49b-6d02-7495-8b07-738adead0f2a",
  type: "page-type/song",
  slug: "imagine-dragons-walking-the-wire",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0c58d8f2-c1a2-4850-b839-429a3590ba99",
      externalLink: "https://musicbrainz.org/work/0c58d8f2-c1a2-4850-b839-429a3590ba99",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Walking the Wire",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
