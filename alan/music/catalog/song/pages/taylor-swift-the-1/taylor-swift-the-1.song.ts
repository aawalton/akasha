import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftThe1 = {
  id: "019ea416-334e-7811-94c8-540f805cc488",
  type: "page-type/song",
  slug: "taylor-swift-the-1",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "52f7833d-8afe-40ae-8258-aaf6ddce8504",
      externalLink: "https://musicbrainz.org/work/52f7833d-8afe-40ae-8258-aaf6ddce8504",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "the 1",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:18.894Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
