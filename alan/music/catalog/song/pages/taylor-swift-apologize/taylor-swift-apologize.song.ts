import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftApologize = {
  id: "019ea416-0d8f-7209-8437-7d08fcb6ffa3",
  type: "page-type/song",
  slug: "taylor-swift-apologize",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8583154f-e5a5-4247-879e-52937d2d3238",
      externalLink: "https://musicbrainz.org/work/8583154f-e5a5-4247-879e-52937d2d3238",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Apologize",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
