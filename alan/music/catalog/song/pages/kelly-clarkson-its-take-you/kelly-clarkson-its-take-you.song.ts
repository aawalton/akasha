import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonItsTakeYou = {
  id: "01a0ba7f-9b52-773d-b5a2-46ba45577332",
  type: "page-type/song",
  slug: "kelly-clarkson-its-take-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2478a64d-dcbf-46ca-9d4b-17b45f672cd8",
      externalLink: "https://musicbrainz.org/work/2478a64d-dcbf-46ca-9d4b-17b45f672cd8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "It's Take You",
  artist: "artist/kelly-clarkson",
  performed: true,
} as const satisfies Song
