import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsShots = {
  id: "019ea49c-e3d3-799f-ba08-0faed3dbd0d6",
  type: "page-type/song",
  slug: "imagine-dragons-shots",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d7e8f649-8ade-4de9-b817-f7a935fc5a8f",
      externalLink: "https://musicbrainz.org/work/d7e8f649-8ade-4de9-b817-f7a935fc5a8f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Shots",
  artist: "artist/imagine-dragons",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
