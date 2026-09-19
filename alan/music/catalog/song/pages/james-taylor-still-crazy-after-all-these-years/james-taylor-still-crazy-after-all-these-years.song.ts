import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorStillCrazyAfterAllTheseYears = {
  id: "01a0b72f-4874-7f5e-a3d4-86a02aa657fc",
  type: "page-type/song",
  slug: "james-taylor-still-crazy-after-all-these-years",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2779e127-3642-465f-b850-17cc1182e25b",
      externalLink: "https://musicbrainz.org/work/2779e127-3642-465f-b850-17cc1182e25b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Still Crazy After All These Years",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
