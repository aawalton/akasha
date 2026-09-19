import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonShakeItOut = {
  id: "019ea4c1-1f4a-776b-bf5b-9154923cbaab",
  type: "page-type/song",
  slug: "kelly-clarkson-shake-it-out",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a69febae-9a12-439b-97f3-4c7fb3123b72",
      externalLink: "https://musicbrainz.org/work/a69febae-9a12-439b-97f3-4c7fb3123b72",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Shake It Out",
  artist: "artist/kelly-clarkson",
  performed: true,
} as const satisfies Song
