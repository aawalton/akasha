import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessAMillionDreams = {
  id: "01a0afa2-0e46-78cb-bba1-5b57e0466e85",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-a-million-dreams",
  ownLength: 4.76395,
  ownProgress: 4.76395,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Million Dreams",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "amilliondreams|0jW6R8CVyVohuUJVcuweDI|285837",
  song: "song/evynne-hollens-a-million-dreams",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-limitless",
      discNumber: 1,
      position: 3,
      externalId: "4v6EUO6tC8RlZDvJ3DBV86",
      externalLink: "https://open.spotify.com/track/4v6EUO6tC8RlZDvJ3DBV86",
    },
  ],
} as const satisfies Track
