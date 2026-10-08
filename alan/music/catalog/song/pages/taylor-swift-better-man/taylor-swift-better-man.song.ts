import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBetterMan = {
  id: "019ea416-08a5-7fef-bbed-efa47d750123",
  type: "page-type/song",
  slug: "taylor-swift-better-man",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "53c4e7af-7028-4412-9d38-d10990de808c",
      externalLink: "https://musicbrainz.org/work/53c4e7af-7028-4412-9d38-d10990de808c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Better Man",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:07.973Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
