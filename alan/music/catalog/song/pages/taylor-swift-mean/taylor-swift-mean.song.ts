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
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
