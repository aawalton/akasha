import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayUntitled4 = {
  id: "01a0ba5d-45a3-710a-8289-777d6727d908",
  type: "page-type/song",
  slug: "coldplay-untitled-4",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b8eb65cf-0cdd-49b6-b94f-5eceada418e3",
      externalLink: "https://musicbrainz.org/work/b8eb65cf-0cdd-49b6-b94f-5eceada418e3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "✨",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
} as const satisfies Song
