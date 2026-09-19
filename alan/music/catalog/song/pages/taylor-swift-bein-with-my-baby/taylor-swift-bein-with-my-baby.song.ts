import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBeinWithMyBaby = {
  id: "019ea416-0fd0-7715-9d41-4160de49d4ae",
  type: "page-type/song",
  slug: "taylor-swift-bein-with-my-baby",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9ea3f8bf-7011-4f37-bd81-d125df87b080",
      externalLink: "https://musicbrainz.org/work/9ea3f8bf-7011-4f37-bd81-d125df87b080",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bein’ With My Baby",
  artist: "artist/taylor-swift",
  performed: false,
  written: "collab",
} as const satisfies Song
