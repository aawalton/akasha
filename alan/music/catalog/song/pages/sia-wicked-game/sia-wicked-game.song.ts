import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaWickedGame = {
  id: "019ea4ce-5190-7957-bcf3-8bb07fbcefa8",
  type: "page-type/song",
  slug: "sia-wicked-game",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e00c1090-092c-34fb-8231-37354d6c5007",
      externalLink: "https://musicbrainz.org/work/e00c1090-092c-34fb-8231-37354d6c5007",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wicked Game",
  artist: "artist/sia",
  performed: true,
  createdAt: "2026-06-08T01:17:25.264Z",
  updatedAt: "2026-09-19T17:02:23.000Z",
} as const satisfies Song
