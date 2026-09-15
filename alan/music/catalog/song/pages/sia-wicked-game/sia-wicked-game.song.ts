import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaWickedGame = {
  id: "019ea4ce-5190-7957-bcf3-8bb07fbcefa8",
  type: "song",
  slug: "sia-wicked-game",
  title: "Wicked Game",
  artist: "artist/sia",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e00c1090-092c-34fb-8231-37354d6c5007",
      externalLink: "https://musicbrainz.org/work/e00c1090-092c-34fb-8231-37354d6c5007",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
} as const satisfies Song
