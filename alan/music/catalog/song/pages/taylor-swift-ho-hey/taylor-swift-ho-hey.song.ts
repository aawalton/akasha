import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftHoHey = {
  id: "019ea416-1b0b-7b7a-80a1-40baee9d2f4a",
  type: "page-type/song",
  slug: "taylor-swift-ho-hey",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "24a7c335-e3f7-4917-b68c-e8ad3dfcac98",
      externalLink: "https://musicbrainz.org/work/24a7c335-e3f7-4917-b68c-e8ad3dfcac98",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ho Hey",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
