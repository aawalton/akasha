import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraCrisis = {
  id: "019ea4a7-6402-7de7-b76f-abc602780601",
  type: "page-type/song",
  slug: "aurora-crisis",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "edff54ff-c495-4b29-96fb-78cb6189c134",
      externalLink: "https://musicbrainz.org/work/edff54ff-c495-4b29-96fb-78cb6189c134",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Crisis",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
