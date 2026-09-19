import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonIdgaf = {
  id: "019ea4a0-b267-7f0a-9729-a8b0b0c669db",
  type: "page-type/song",
  slug: "zara-larsson-idgaf",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a22bca0f-0c07-43b8-bf89-2acc562c4b1f",
      externalLink: "https://musicbrainz.org/work/a22bca0f-0c07-43b8-bf89-2acc562c4b1f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "IDGAF",
  artist: "artist/zara-larsson",
  performed: true,
} as const satisfies Song
