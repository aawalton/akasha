import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsEyesClosed = {
  id: "019ea499-6a67-7ea9-b778-0eb070709475",
  type: "page-type/song",
  slug: "imagine-dragons-eyes-closed",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "886816d3-6494-4fbd-a1c3-c372e752deca",
      externalLink: "https://musicbrainz.org/work/886816d3-6494-4fbd-a1c3-c372e752deca",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Eyes Closed",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
