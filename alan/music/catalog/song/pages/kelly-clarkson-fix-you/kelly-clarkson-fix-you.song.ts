import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonFixYou = {
  id: "019ea4af-ee69-7577-b5bf-07631fa24cc9",
  type: "page-type/song",
  slug: "kelly-clarkson-fix-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c309eb61-2852-35e5-841b-151d4cf5807e",
      externalLink: "https://musicbrainz.org/work/c309eb61-2852-35e5-841b-151d4cf5807e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fix You",
  artist: "artist/kelly-clarkson",
  performed: true,
} as const satisfies Song
