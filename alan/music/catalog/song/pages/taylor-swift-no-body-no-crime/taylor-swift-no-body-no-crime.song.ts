import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftNoBodyNoCrime = {
  id: "019ea416-2f19-75d4-95f9-3807d3358a72",
  type: "page-type/song",
  slug: "taylor-swift-no-body-no-crime",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "136f800a-6b79-429e-b15a-85402ad11b41",
      externalLink: "https://musicbrainz.org/work/136f800a-6b79-429e-b15a-85402ad11b41",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "no body, no crime",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
