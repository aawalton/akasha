import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraIntoTheUnknown = {
  id: "019ea4a4-c7de-739b-b03a-7c57a9a35bcd",
  type: "page-type/song",
  slug: "aurora-into-the-unknown",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4aefb4ed-8e57-42a3-ae70-819983a6b268",
      externalLink: "https://musicbrainz.org/work/4aefb4ed-8e57-42a3-ae70-819983a6b268",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Into the Unknown",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
