import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraBango = {
  id: "019ea4a6-4253-79fb-a413-e717fc626132",
  type: "page-type/song",
  slug: "aurora-bango",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "93049a8d-41f2-4dad-85f0-e71c0312a13b",
      externalLink: "https://musicbrainz.org/work/93049a8d-41f2-4dad-85f0-e71c0312a13b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bango",
  artist: "artist/aurora",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T00:33:39.923Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
