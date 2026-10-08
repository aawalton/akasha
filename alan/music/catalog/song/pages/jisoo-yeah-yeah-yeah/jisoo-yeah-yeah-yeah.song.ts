import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jisooYeahYeahYeah = {
  id: "01a0b724-3865-726b-9054-c3f527abf10d",
  type: "page-type/song",
  slug: "jisoo-yeah-yeah-yeah",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "192c2ec1-ac94-4f32-be57-19f2bdaf84a4",
      externalLink: "https://musicbrainz.org/work/192c2ec1-ac94-4f32-be57-19f2bdaf84a4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Yeah Yeah Yeah",
  artist: "artist/jisoo",
  performed: false,
  written: "collab",
  createdAt: "2026-09-19T00:49:59.397Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
