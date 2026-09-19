import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishUKnowWhatSUp = {
  id: "019ea4a9-3820-7dc4-b0c1-018f7e83515c",
  type: "page-type/song",
  slug: "billie-eilish-u-know-what-s-up",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "45b4e247-ac18-4583-84e6-5ec2f90b61a9",
      externalLink: "https://musicbrainz.org/work/45b4e247-ac18-4583-84e6-5ec2f90b61a9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "U Know What’s Up",
  artist: "artist/billie-eilish",
  performed: false,
  written: "collab",
} as const satisfies Song
