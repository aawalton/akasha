import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaStrangeBirds = {
  id: "019ea4cd-6664-7a98-b227-2f0abedb09f9",
  type: "page-type/song",
  slug: "sia-strange-birds",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9f1c5cee-881d-465a-ad6e-0bf7bbc33a00",
      externalLink: "https://musicbrainz.org/work/9f1c5cee-881d-465a-ad6e-0bf7bbc33a00",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Strange Birds",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
