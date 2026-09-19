import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraFrozenPeaks = {
  id: "019ea4a4-a4a0-73b6-b803-c9483cf85bc7",
  type: "page-type/song",
  slug: "aurora-frozen-peaks",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4a57bc63-217b-4cd3-8ec0-a6c8fa45680d",
      externalLink: "https://musicbrainz.org/work/4a57bc63-217b-4cd3-8ec0-a6c8fa45680d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Frozen Peaks",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
