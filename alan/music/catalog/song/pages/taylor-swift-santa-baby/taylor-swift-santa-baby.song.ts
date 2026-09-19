import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSantaBaby = {
  id: "01a0ba97-751b-7916-97a3-dcaeb55698af",
  type: "page-type/song",
  slug: "taylor-swift-santa-baby",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a10d7ca4-2dea-3127-b84c-b15fdd24b026",
      externalLink: "https://musicbrainz.org/work/a10d7ca4-2dea-3127-b84c-b15fdd24b026",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Santa Baby",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
