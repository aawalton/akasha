import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonGoodGoesTheBye = {
  id: "019ea4af-23ae-7ac8-b3bb-ad19bcce5010",
  type: "page-type/song",
  slug: "kelly-clarkson-good-goes-the-bye",
  title: "Good Goes the Bye",
  artist: "artist/kelly-clarkson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "816be5bd-244d-455e-b8ac-452dca7164d4",
      externalLink: "https://musicbrainz.org/work/816be5bd-244d-455e-b8ac-452dca7164d4",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
