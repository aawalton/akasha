import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftNashville = {
  id: "019ea416-3baf-77b0-8eec-5ec1d92e1961",
  type: "page-type/song",
  slug: "taylor-swift-nashville",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b9ba7aa2-bc9b-4620-b4c4-0272db6cb991",
      externalLink: "https://musicbrainz.org/work/b9ba7aa2-bc9b-4620-b4c4-0272db6cb991",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nashville",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
