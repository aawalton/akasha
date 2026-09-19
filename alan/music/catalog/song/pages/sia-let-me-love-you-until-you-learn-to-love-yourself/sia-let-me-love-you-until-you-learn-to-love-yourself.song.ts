import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaLetMeLoveYouUntilYouLearnToLoveYourself = {
  id: "019ea4c9-7aaf-76e2-a85b-046858577d20",
  type: "page-type/song",
  slug: "sia-let-me-love-you-until-you-learn-to-love-yourself",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a93e6cca-40e6-4a09-aef6-8aae3c2b00b0",
      externalLink: "https://musicbrainz.org/work/a93e6cca-40e6-4a09-aef6-8aae3c2b00b0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let Me Love You (Until You Learn to Love Yourself)",
  artist: "artist/sia",
  performed: true,
  written: "collab",
} as const satisfies Song
