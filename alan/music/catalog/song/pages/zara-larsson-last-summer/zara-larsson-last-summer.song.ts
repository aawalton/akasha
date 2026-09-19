import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonLastSummer = {
  id: "019ea49f-7a59-7840-9024-bad66097fd2b",
  type: "page-type/song",
  slug: "zara-larsson-last-summer",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "50f1c364-59ac-441f-932b-4db430049021",
      externalLink: "https://musicbrainz.org/work/50f1c364-59ac-441f-932b-4db430049021",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Last Summer",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
