import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishKen = {
  id: "019ea4ac-1fe5-7e18-ba53-a8b09b5e0dac",
  type: "page-type/song",
  slug: "billie-eilish-ken",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e8445176-d057-4cca-b336-528b9e756ca0",
      externalLink: "https://musicbrainz.org/work/e8445176-d057-4cca-b336-528b9e756ca0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "KEN",
  artist: "artist/billie-eilish",
  performed: true,
  written: "collab",
} as const satisfies Song
