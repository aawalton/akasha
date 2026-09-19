import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysBeethovens5Secrets = {
  id: "01a0b71e-9df8-7f76-a819-944b943de1f9",
  type: "page-type/song",
  slug: "the-piano-guys-beethovens-5-secrets",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d25074da-651b-4ce0-8fcb-fb0dbe7e5303",
      externalLink: "https://musicbrainz.org/work/d25074da-651b-4ce0-8fcb-fb0dbe7e5303",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Beethoven's 5 Secrets",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
