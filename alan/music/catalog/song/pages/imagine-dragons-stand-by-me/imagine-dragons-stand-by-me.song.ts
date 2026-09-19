import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsStandByMe = {
  id: "019ea49c-1c1c-7b90-b7f4-4281eb921400",
  type: "page-type/song",
  slug: "imagine-dragons-stand-by-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "54d6831c-4447-3087-a71e-3f92aa1fad27",
      externalLink: "https://musicbrainz.org/work/54d6831c-4447-3087-a71e-3f92aa1fad27",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Stand by Me",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
