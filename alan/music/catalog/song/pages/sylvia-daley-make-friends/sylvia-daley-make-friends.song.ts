import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sylviaDaleyMakeFriends = {
  id: "01a0b725-aee5-7e41-80fa-970d39e5b437",
  type: "page-type/song",
  slug: "sylvia-daley-make-friends",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "af4ee9d1-07f2-4135-8fb5-fe03e5e25eac",
      externalLink: "https://musicbrainz.org/work/af4ee9d1-07f2-4135-8fb5-fe03e5e25eac",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Make Friends",
  artist: "artist/sylvia-daley",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
