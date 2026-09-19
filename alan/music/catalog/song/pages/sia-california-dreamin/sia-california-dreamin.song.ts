import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaCaliforniaDreamin = {
  id: "01a0ba9e-0006-7ece-a829-38ad3e09efe6",
  type: "page-type/song",
  slug: "sia-california-dreamin",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3349eab0-3c79-3343-8924-cc7c5ed549c8",
      externalLink: "https://musicbrainz.org/work/3349eab0-3c79-3343-8924-cc7c5ed549c8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "California Dreamin’",
  artist: "artist/sia",
  performed: true,
} as const satisfies Song
