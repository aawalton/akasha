import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonMedley60 = {
  id: "01a0ba7f-aad4-720c-961f-b6e1681de23f",
  type: "page-type/song",
  slug: "kelly-clarkson-medley-60",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "969cc855-5db5-4d83-acab-5f26c8242a31",
      externalLink: "https://musicbrainz.org/work/969cc855-5db5-4d83-acab-5f26c8242a31",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Medley 60",
  artist: "artist/kelly-clarkson",
  performed: true,
} as const satisfies Song
