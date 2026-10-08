import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftLoveTheyHavenTThoughtOfYet = {
  id: "019ea416-2203-750f-a88c-fd98bc97ed3e",
  type: "page-type/song",
  slug: "taylor-swift-love-they-haven-t-thought-of-yet",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "79bc1b03-7adc-4f82-9053-266bea36069b",
      externalLink: "https://musicbrainz.org/work/79bc1b03-7adc-4f82-9053-266bea36069b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Love They Haven't Thought Of Yet",
  artist: "artist/taylor-swift",
  performed: true,
  written: "collab",
  createdAt: "2026-06-07T21:56:14.467Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
