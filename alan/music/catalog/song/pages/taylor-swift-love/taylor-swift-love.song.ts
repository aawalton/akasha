import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftLove = {
  id: "019ea416-1a85-7538-a7c9-c1c3cf00b89d",
  type: "page-type/song",
  slug: "taylor-swift-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1739eca0-5488-4c92-ab58-d4f5ac72e711",
      externalLink: "https://musicbrainz.org/work/1739eca0-5488-4c92-ab58-d4f5ac72e711",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Love",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
