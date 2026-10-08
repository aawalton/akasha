import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBetterOff = {
  id: "019ea416-022a-7b1e-9b62-66e9dd154502",
  type: "page-type/song",
  slug: "taylor-swift-better-off",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "011046e6-7b97-4af9-bf67-c4b99b7f402e",
      externalLink: "https://musicbrainz.org/work/011046e6-7b97-4af9-bf67-c4b99b7f402e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Better Off",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:06.314Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
