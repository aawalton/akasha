import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiEverybodyScream = {
  id: "019f0ea7-8d23-76b0-81e8-89561d917ea0",
  type: "page-type/song",
  slug: "mitski-everybody-scream",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e04d7dbe-ebe2-4893-adbb-b80a71bc8018",
      externalLink: "https://musicbrainz.org/work/e04d7dbe-ebe2-4893-adbb-b80a71bc8018",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Everybody Scream",
  artist: "artist/mitski",
  performed: false,
  written: "collab",
} as const satisfies Song
