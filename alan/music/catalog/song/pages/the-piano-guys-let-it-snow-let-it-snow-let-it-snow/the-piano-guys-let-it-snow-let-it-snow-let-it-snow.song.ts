import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysLetItSnowLetItSnowLetItSnow = {
  id: "01a0b71e-9cff-7b5e-8077-0f44edd6f499",
  type: "page-type/song",
  slug: "the-piano-guys-let-it-snow-let-it-snow-let-it-snow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b64ce599-84ef-38b7-b909-770a15ae224d",
      externalLink: "https://musicbrainz.org/work/b64ce599-84ef-38b7-b909-770a15ae224d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let It Snow! Let It Snow! Let It Snow!",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
