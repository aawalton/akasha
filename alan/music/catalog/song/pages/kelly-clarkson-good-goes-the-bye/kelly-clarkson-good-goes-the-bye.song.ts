import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonGoodGoesTheBye = {
  id: "019ea4af-23ae-7ac8-b3bb-ad19bcce5010",
  type: "page-type/song",
  slug: "kelly-clarkson-good-goes-the-bye",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "816be5bd-244d-455e-b8ac-452dca7164d4",
      externalLink: "https://musicbrainz.org/work/816be5bd-244d-455e-b8ac-452dca7164d4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Good Goes the Bye",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:43:21.902Z",
  updatedAt: "2026-09-19T16:29:09.000Z",
} as const satisfies Song
