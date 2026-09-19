import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftLuckyYou = {
  id: "019ea416-1f7d-7c02-8a05-dcd65e96805a",
  type: "page-type/song",
  slug: "taylor-swift-lucky-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6398e063-cf22-40b8-a1e8-15f8ccf64052",
      externalLink: "https://musicbrainz.org/work/6398e063-cf22-40b8-a1e8-15f8ccf64052",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lucky You",
  artist: "artist/taylor-swift",
  performed: true,
  written: "solo",
} as const satisfies Song
