import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonCaliforniaDreamin = {
  id: "019ea4ad-6f26-70ce-a3c7-e8d00860edd1",
  type: "page-type/song",
  slug: "kelly-clarkson-california-dreamin",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3349eab0-3c79-3343-8924-cc7c5ed549c8",
      externalLink: "https://musicbrainz.org/work/3349eab0-3c79-3343-8924-cc7c5ed549c8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "California Dreamin’",
  artist: "artist/kelly-clarkson",
  performed: true,
} as const satisfies Song
