import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonTellMeALie = {
  id: "019ea4b2-6d5d-7f21-8622-c7bd60c42bd9",
  type: "page-type/song",
  slug: "kelly-clarkson-tell-me-a-lie",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "68be5505-6039-412f-9bfe-c9feaed84b71",
      externalLink: "https://musicbrainz.org/work/68be5505-6039-412f-9bfe-c9feaed84b71",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tell Me a Lie",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
