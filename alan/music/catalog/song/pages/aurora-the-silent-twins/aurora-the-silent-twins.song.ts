import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheSilentTwins = {
  id: "01a0ba99-731f-7b07-82c4-1ae6f563e280",
  type: "page-type/song",
  slug: "aurora-the-silent-twins",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e62851bb-38d0-4dd0-b6d7-a8e964ba8b62",
      externalLink: "https://musicbrainz.org/work/e62851bb-38d0-4dd0-b6d7-a8e964ba8b62",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Silent Twins",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
