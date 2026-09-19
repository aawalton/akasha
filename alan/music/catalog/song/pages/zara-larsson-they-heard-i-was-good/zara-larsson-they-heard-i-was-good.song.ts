import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonTheyHeardIWasGood = {
  id: "019ea49e-cf24-739b-bcdc-c87c6266dadc",
  type: "page-type/song",
  slug: "zara-larsson-they-heard-i-was-good",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "31a147f9-0469-4db4-b10e-a45256aae067",
      externalLink: "https://musicbrainz.org/work/31a147f9-0469-4db4-b10e-a45256aae067",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "They Heard I Was Good",
  artist: "artist/zara-larsson",
  performed: true,
} as const satisfies Song
