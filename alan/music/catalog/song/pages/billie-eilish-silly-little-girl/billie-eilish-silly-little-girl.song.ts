import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishSillyLittleGirl = {
  id: "019ea4ab-e908-7ec2-b967-67bb25bb7baf",
  type: "page-type/song",
  slug: "billie-eilish-silly-little-girl",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e2148b57-35ea-4d30-8906-d2f701026343",
      externalLink: "https://musicbrainz.org/work/e2148b57-35ea-4d30-8906-d2f701026343",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Silly Little Girl",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
