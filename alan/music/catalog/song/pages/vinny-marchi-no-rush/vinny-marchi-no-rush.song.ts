import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiNoRush = {
  id: "01a0b725-5369-77df-a061-bcc1ccd41c49",
  type: "page-type/song",
  slug: "vinny-marchi-no-rush",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6b0d4d4c-b831-412b-9fb8-4401da105b9c",
      externalLink: "https://musicbrainz.org/work/6b0d4d4c-b831-412b-9fb8-4401da105b9c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "No Rush",
  artist: "artist/vinny-marchi",
  performed: false,
  written: "collab",
  createdAt: "2026-09-19T00:51:11.849Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
