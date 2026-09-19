import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftPhotograph = {
  id: "019ea416-371c-73ed-b723-15a5f81e6f27",
  type: "page-type/song",
  slug: "taylor-swift-photograph",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "752809e7-634f-375d-b4d2-e637ce40f8b0",
      externalLink: "https://musicbrainz.org/work/752809e7-634f-375d-b4d2-e637ce40f8b0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Photograph",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
