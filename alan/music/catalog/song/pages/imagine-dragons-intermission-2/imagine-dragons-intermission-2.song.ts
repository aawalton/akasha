import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsIntermission2 = {
  id: "019ea498-c3ee-792d-86eb-976caabc1b5b",
  type: "page-type/song",
  slug: "imagine-dragons-intermission-2",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6f479312-0f0f-4879-8438-349661183680",
      externalLink: "https://musicbrainz.org/work/6f479312-0f0f-4879-8438-349661183680",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Intermission #2",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
