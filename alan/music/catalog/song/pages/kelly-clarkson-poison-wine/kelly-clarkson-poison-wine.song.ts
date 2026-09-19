import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonPoisonWine = {
  id: "019ea4c0-dd17-7924-9ee5-0fb28867a60b",
  type: "page-type/song",
  slug: "kelly-clarkson-poison-wine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a0523a5a-3411-3863-801c-9719d7238957",
      externalLink: "https://musicbrainz.org/work/a0523a5a-3411-3863-801c-9719d7238957",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Poison & Wine",
  artist: "artist/kelly-clarkson",
  performed: true,
} as const satisfies Song
