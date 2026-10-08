import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMean = {
  id: "019ea416-24ed-7c0b-b4a2-59a914b49300",
  type: "page-type/song",
  slug: "taylor-swift-mean",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "99ab9108-8c70-3578-a9ff-0fd74729c622",
      externalLink: "https://musicbrainz.org/work/99ab9108-8c70-3578-a9ff-0fd74729c622",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mean",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:15.213Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
