import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsBlankSpace = {
  id: "01a0ba8a-55d4-73dd-862c-fe667e3aa3cc",
  type: "page-type/song",
  slug: "imagine-dragons-blank-space",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "05980852-95f4-4ea2-806a-abf1666951b8",
      externalLink: "https://musicbrainz.org/work/05980852-95f4-4ea2-806a-abf1666951b8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Blank Space",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
