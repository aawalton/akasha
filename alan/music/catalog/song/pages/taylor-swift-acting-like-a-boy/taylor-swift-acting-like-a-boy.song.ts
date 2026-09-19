import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftActingLikeABoy = {
  id: "019ea416-0d5a-79d1-a09f-693664af39d2",
  type: "page-type/song",
  slug: "taylor-swift-acting-like-a-boy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "83d791a3-2e36-46f3-aabd-0403b9cb6861",
      externalLink: "https://musicbrainz.org/work/83d791a3-2e36-46f3-aabd-0403b9cb6861",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Acting Like a Boy",
  artist: "artist/taylor-swift",
  performed: false,
  written: "collab",
} as const satisfies Song
