import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheThing = {
  id: "019ea4a5-4912-7f87-ab0f-09fbe4e672d5",
  type: "page-type/song",
  slug: "aurora-the-thing",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "59d6c953-01f0-48c8-a90a-09d7914ec078",
      externalLink: "https://musicbrainz.org/work/59d6c953-01f0-48c8-a90a-09d7914ec078",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "THE THING",
  artist: "artist/aurora",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
