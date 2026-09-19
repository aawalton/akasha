import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBestDaysOfYourLife = {
  id: "019ea416-146c-75ff-bcae-3520d4523e44",
  type: "page-type/song",
  slug: "taylor-swift-best-days-of-your-life",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c49daabd-5f51-4db1-85f5-43e05004589a",
      externalLink: "https://musicbrainz.org/work/c49daabd-5f51-4db1-85f5-43e05004589a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Best Days of Your Life",
  artist: "artist/taylor-swift",
  performed: false,
  written: "collab",
} as const satisfies Song
