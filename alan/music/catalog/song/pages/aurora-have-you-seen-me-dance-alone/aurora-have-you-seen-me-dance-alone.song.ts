import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraHaveYouSeenMeDanceAlone = {
  id: "019ea4a6-4bda-7033-b68c-c15def1f06c3",
  type: "page-type/song",
  slug: "aurora-have-you-seen-me-dance-alone",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "94edfe87-1da2-4eb5-b5f0-83e8fb292b1e",
      externalLink: "https://musicbrainz.org/work/94edfe87-1da2-4eb5-b5f0-83e8fb292b1e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "HAVE YOU SEEN ME DANCE ALONE",
  artist: "artist/aurora",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
