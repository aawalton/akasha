import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishFreaks = {
  id: "019ea4a9-807f-7c7c-8c71-fed0c51b9681",
  type: "page-type/song",
  slug: "billie-eilish-freaks",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "50cca196-9ef2-454e-88e0-56863fdab25d",
      externalLink: "https://musicbrainz.org/work/50cca196-9ef2-454e-88e0-56863fdab25d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Freaks",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
