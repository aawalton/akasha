import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonInvincible = {
  id: "01a0ba7f-ac74-7094-9c4d-dc4bc29ad3ec",
  type: "page-type/song",
  slug: "kelly-clarkson-invincible",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a5ca49c1-1b32-43e2-9e32-b304550b2961",
      externalLink: "https://musicbrainz.org/work/a5ca49c1-1b32-43e2-9e32-b304550b2961",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Invincible",
  artist: "artist/kelly-clarkson",
  performed: true,
} as const satisfies Song
