import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftNoBodyNoCrime = {
  id: "019ea416-2f19-75d4-95f9-3807d3358a72",
  type: "song",
  slug: "taylor-swift-no-body-no-crime",
  title: "no body, no crime",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "136f800a-6b79-429e-b15a-85402ad11b41",
      externalLink: "https://musicbrainz.org/work/136f800a-6b79-429e-b15a-85402ad11b41",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
