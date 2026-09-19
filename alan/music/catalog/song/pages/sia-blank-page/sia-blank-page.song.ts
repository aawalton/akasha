import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBlankPage = {
  id: "019ea4c5-0d53-7b72-b946-87b3380f3b96",
  type: "page-type/song",
  slug: "sia-blank-page",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a00efe45-367b-4c82-8078-447d2cffb50a",
      externalLink: "https://musicbrainz.org/work/a00efe45-367b-4c82-8078-447d2cffb50a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Blank Page",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
