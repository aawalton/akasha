import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorBittersweet = {
  id: "01a0b72f-307e-7983-842f-48eb88942942",
  type: "page-type/song",
  slug: "james-taylor-bittersweet",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e35f56fd-223a-4a11-bcb6-ebf5e39791be",
      externalLink: "https://musicbrainz.org/work/e35f56fd-223a-4a11-bcb6-ebf5e39791be",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bittersweet",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
