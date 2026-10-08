import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSayDonTGo = {
  id: "019ea416-411e-7bf3-bd96-5ac7e4d04579",
  type: "page-type/song",
  slug: "taylor-swift-say-don-t-go",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f1bb636f-883e-4bd6-8bc7-9a493fff0164",
      externalLink: "https://musicbrainz.org/work/f1bb636f-883e-4bd6-8bc7-9a493fff0164",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Say Don’t Go",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:22.430Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
