import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiNoIdea = {
  id: "019f0ea2-b672-7388-8841-8d51bad5338f",
  type: "page-type/song",
  slug: "mitski-no-idea",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7d986e30-3f86-4cb6-ad13-75d9ebc8f867",
      externalLink: "https://musicbrainz.org/work/7d986e30-3f86-4cb6-ad13-75d9ebc8f867",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "No Idea",
  artist: "artist/mitski",
  performed: false,
  written: "collab",
  createdAt: "2026-06-28T14:29:32.402Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
