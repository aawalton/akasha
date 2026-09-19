import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonLoveOnTheBrain = {
  id: "019ea4ae-61d7-76c0-8c0a-e8793d1762a3",
  type: "page-type/song",
  slug: "kelly-clarkson-love-on-the-brain",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "55a7e31f-da75-4b86-b54f-fc765e871559",
      externalLink: "https://musicbrainz.org/work/55a7e31f-da75-4b86-b54f-fc765e871559",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Love on the Brain",
  artist: "artist/kelly-clarkson",
  performed: true,
} as const satisfies Song
