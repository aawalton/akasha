import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonWalkawayJoe = {
  id: "019ea4b1-37bb-7cc9-9039-f5e30e21b081",
  type: "page-type/song",
  slug: "kelly-clarkson-walkaway-joe",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "07bf5ddb-c01b-4918-8140-04a861072555",
      externalLink: "https://musicbrainz.org/work/07bf5ddb-c01b-4918-8140-04a861072555",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Walkaway Joe",
  artist: "artist/kelly-clarkson",
  performed: true,
} as const satisfies Song
