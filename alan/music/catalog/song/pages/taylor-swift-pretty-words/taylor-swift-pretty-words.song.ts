import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftPrettyWords = {
  id: "019ea416-3f35-73f0-a308-4e7df77c7331",
  type: "page-type/song",
  slug: "taylor-swift-pretty-words",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e61e8848-04db-4208-9d67-4e60bab35593",
      externalLink: "https://musicbrainz.org/work/e61e8848-04db-4208-9d67-4e60bab35593",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Pretty Words",
  artist: "artist/taylor-swift",
  performed: false,
  written: "collab",
} as const satisfies Song
