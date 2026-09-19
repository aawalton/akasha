import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraCompanionship = {
  id: "019ea4a6-303f-7657-8361-4319628632d5",
  type: "page-type/song",
  slug: "aurora-companionship",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9235a327-1483-4e04-a47b-9429b4a220b3",
      externalLink: "https://musicbrainz.org/work/9235a327-1483-4e04-a47b-9429b4a220b3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Companionship",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
