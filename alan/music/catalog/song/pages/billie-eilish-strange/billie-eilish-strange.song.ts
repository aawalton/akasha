import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishStrange = {
  id: "019ea4ab-27d8-79b5-825c-8ce3c1c0bbd7",
  type: "page-type/song",
  slug: "billie-eilish-strange",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bc6128e3-03e5-4875-b077-032ef64b0136",
      externalLink: "https://musicbrainz.org/work/bc6128e3-03e5-4875-b077-032ef64b0136",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "strange",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
