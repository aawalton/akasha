import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysCodeNameVivaldi = {
  id: "01a0afa2-18e6-7527-8216-847e81241e59",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-code-name-vivaldi",
  ownLength: 4.114616666666667,
  ownProgress: 4.114616666666667,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  status: "completed",
  unit: "unit/minutes",
  title: "Code Name Vivaldi",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "codenamevivaldi|0jW6R8CVyVohuUJVcuweDI|246877",
  song: "song/the-piano-guys-code-name-vivaldi",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys",
      discNumber: 1,
      position: 3,
      externalId: "5WKDDrq02f0mH3G1ZYmozK",
      externalLink: "https://open.spotify.com/track/5WKDDrq02f0mH3G1ZYmozK",
    },
  ],
} as const satisfies Track
