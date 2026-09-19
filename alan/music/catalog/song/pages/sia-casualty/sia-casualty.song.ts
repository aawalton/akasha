import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaCasualty = {
  id: "019ea4c6-5970-73a5-8c98-c055a96dc499",
  type: "page-type/song",
  slug: "sia-casualty",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f1998339-83b2-4ea3-80ff-a0c361866f04",
      externalLink: "https://musicbrainz.org/work/f1998339-83b2-4ea3-80ff-a0c361866f04",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Casualty",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
