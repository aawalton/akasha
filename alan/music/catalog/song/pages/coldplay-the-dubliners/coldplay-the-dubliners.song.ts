import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayTheDubliners = {
  id: "01a0ba60-f7d7-7565-9847-940ab665cecf",
  type: "page-type/song",
  slug: "coldplay-the-dubliners",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "af1d72ae-56b5-495a-ba04-0fca9fc9539d",
      externalLink: "https://musicbrainz.org/work/af1d72ae-56b5-495a-ba04-0fca9fc9539d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Dubliners",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
} as const satisfies Song
