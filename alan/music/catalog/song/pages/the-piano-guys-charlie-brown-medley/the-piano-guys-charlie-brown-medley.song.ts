import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysCharlieBrownMedley = {
  id: "01a0b71e-9b24-7fb6-8970-366ff20a5da8",
  type: "page-type/song",
  slug: "the-piano-guys-charlie-brown-medley",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7739ebcf-268d-4401-9171-00feeb008aa8",
      externalLink: "https://musicbrainz.org/work/7739ebcf-268d-4401-9171-00feeb008aa8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Charlie Brown Medley",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
