import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaOn = {
  id: "019ea4c6-b181-70b3-a6f0-69f100c7371f",
  type: "page-type/song",
  slug: "sia-on",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "070af130-0f5e-4d64-82ba-68e260887b32",
      externalLink: "https://musicbrainz.org/work/070af130-0f5e-4d64-82ba-68e260887b32",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "ON",
  artist: "artist/sia",
  performed: true,
} as const satisfies Song
