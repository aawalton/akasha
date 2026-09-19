import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraUntitled = {
  id: "019ea4a7-c095-7a93-a8db-1ab9d98f6f79",
  type: "page-type/song",
  slug: "aurora-untitled",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "31623786-2076-48d9-b32a-09849643935b",
      externalLink: "https://musicbrainz.org/work/31623786-2076-48d9-b32a-09849643935b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "イントゥ・ジ・アンノウン〜心のままに",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
