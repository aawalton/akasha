import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const taylorSwiftAllTooWellJakeSVersion = {
  id: "019ea416-0426-7245-81b5-555d83e7a831",
  type: "song",
  slug: "taylor-swift-all-too-well-jake-s-version",
  title: "All Too Well (Jake’s version)",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "223bae6c-6f53-446a-8914-a31b75b78e3b",
      externalLink: "https://musicbrainz.org/work/223bae6c-6f53-446a-8914-a31b75b78e3b",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: false,
  written: "collab",
} as const satisfies Song
