import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSaveYourTearsRemix = {
  id: "01a0ba8d-83f8-74ab-9515-d881e99576af",
  type: "page-type/song",
  slug: "ariana-grande-save-your-tears-remix",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1a0ae8f7-d6d0-4131-8a8a-5df6d593ba85",
      externalLink: "https://musicbrainz.org/work/1a0ae8f7-d6d0-4131-8a8a-5df6d593ba85",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Save Your Tears (remix)",
  artist: "artist/ariana-grande",
  songType: "derivative",
  performed: true,
  written: "collab",
} as const satisfies Song
