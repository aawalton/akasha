import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonRunRudolphRun = {
  id: "019ea4c1-173d-76ea-9f7d-6407e561155e",
  type: "page-type/song",
  slug: "kelly-clarkson-run-rudolph-run",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a686cf82-c7c3-4032-9001-c08a0ea4c77a",
      externalLink: "https://musicbrainz.org/work/a686cf82-c7c3-4032-9001-c08a0ea4c77a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Run Rudolph Run",
  artist: "artist/kelly-clarkson",
  performed: true,
} as const satisfies Song
