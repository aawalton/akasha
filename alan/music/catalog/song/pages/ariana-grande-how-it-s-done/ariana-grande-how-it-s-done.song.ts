import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeHowItSDone = {
  id: "019ea4e0-bcec-762e-b01e-cffa7b8a156b",
  type: "page-type/song",
  slug: "ariana-grande-how-it-s-done",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "241734df-db59-4929-85e1-14360f47120e",
      externalLink: "https://musicbrainz.org/work/241734df-db59-4929-85e1-14360f47120e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "How It’s Done",
  artist: "artist/ariana-grande",
  performed: false,
  written: "collab",
} as const satisfies Song
