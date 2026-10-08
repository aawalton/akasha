import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheMomentIKnew = {
  id: "019ea416-36b0-7e08-9dc6-37e339d1fa0c",
  type: "page-type/song",
  slug: "taylor-swift-the-moment-i-knew",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "68b42983-ab47-420b-94c2-5cdbf6f172cd",
      externalLink: "https://musicbrainz.org/work/68b42983-ab47-420b-94c2-5cdbf6f172cd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Moment I Knew",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:19.760Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
