import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonMeltAway = {
  id: "019ea4a1-784c-74e8-aaff-a1f63cfbd866",
  type: "page-type/song",
  slug: "zara-larsson-melt-away",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c444ca1b-80eb-4291-8c4b-268317ac89a8",
      externalLink: "https://musicbrainz.org/work/c444ca1b-80eb-4291-8c4b-268317ac89a8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Melt Away",
  artist: "artist/zara-larsson",
  performed: false,
  written: "collab",
} as const satisfies Song
