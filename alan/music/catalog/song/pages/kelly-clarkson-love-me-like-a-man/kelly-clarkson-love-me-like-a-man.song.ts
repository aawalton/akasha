import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonLoveMeLikeAMan = {
  id: "019ea4ae-9c93-7e7b-8fbc-3e2bc3533854",
  type: "song",
  slug: "kelly-clarkson-love-me-like-a-man",
  title: "Love Me Like a Man",
  artist: "artist/kelly-clarkson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "61514870-994d-474f-a3ba-d9388421557d",
      externalLink: "https://musicbrainz.org/work/61514870-994d-474f-a3ba-d9388421557d",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
} as const satisfies Song
