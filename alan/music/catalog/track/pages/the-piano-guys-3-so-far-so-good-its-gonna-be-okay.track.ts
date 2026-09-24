import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodItsGonnaBeOkay = {
  id: "01a0afa2-1c8b-71a3-9200-66e67ebe18aa",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-its-gonna-be-okay",
  ownLength: 3.5133833333333335,
  ownProgress: 3.5133833333333335,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "(It's Gonna Be) Okay",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }, { artistName: "Al van der Beek" }],
  trackKey: "itsgonnabeokay|0jW6R8CVyVohuUJVcuweDI,1RTHEDesKGANeFDXyDJBQU|210803",
  song: "song/the-piano-guys-its-gonna-be-okay",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-so-far-so-good",
      discNumber: 1,
      position: 13,
      externalId: "0haid7kVyi8UKd5b5ElSOU",
      externalLink: "https://open.spotify.com/track/0haid7kVyi8UKd5b5ElSOU",
    },
  ],
} as const satisfies Track
