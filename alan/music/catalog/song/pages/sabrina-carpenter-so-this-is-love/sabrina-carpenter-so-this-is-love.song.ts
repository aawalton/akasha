import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterSoThisIsLove = {
  id: "01a0b723-d84c-76a8-8b9c-142f0a190cda",
  type: "page-type/song",
  slug: "sabrina-carpenter-so-this-is-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c3c238b4-51c0-3845-ba7d-30ea5f567481",
      externalLink: "https://musicbrainz.org/work/c3c238b4-51c0-3845-ba7d-30ea5f567481",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "So This Is Love",
  artist: "artist/sabrina-carpenter",
  performed: true,
  createdAt: "2026-09-19T00:49:34.796Z",
  updatedAt: "2026-09-19T16:49:35.000Z",
} as const satisfies Song
