import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonLoveMeLikeAMan = {
  id: "019ea4ae-9c93-7e7b-8fbc-3e2bc3533854",
  type: "page-type/song",
  slug: "kelly-clarkson-love-me-like-a-man",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "61514870-994d-474f-a3ba-d9388421557d",
      externalLink: "https://musicbrainz.org/work/61514870-994d-474f-a3ba-d9388421557d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Love Me Like a Man",
  artist: "artist/kelly-clarkson",
  performed: true,
  createdAt: "2026-06-08T00:42:47.315Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
