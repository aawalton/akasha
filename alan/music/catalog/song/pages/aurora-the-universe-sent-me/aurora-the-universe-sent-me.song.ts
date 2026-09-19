import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheUniverseSentMe = {
  id: "019ea4a3-d6d2-7f01-8f9e-92f480694e3d",
  type: "page-type/song",
  slug: "aurora-the-universe-sent-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "26d29272-0967-487d-896e-a9578a04c808",
      externalLink: "https://musicbrainz.org/work/26d29272-0967-487d-896e-a9578a04c808",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Universe Sent Me",
  artist: "artist/aurora",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
