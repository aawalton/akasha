import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberPianoStringEnsembleSleepingFlowers = {
  id: "01a0b4c8-2d49-7728-8e1e-84e1764085bb",
  type: "page-type/track",
  slug: "paul-cardall-december-piano-string-ensemble-sleeping-flowers",
  ownLength: 3.7091,
  ownProgress: 3.7091,
  partOfCollections: ["release/paul-cardall-december-piano-string-ensemble"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sleeping Flowers",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "sleepingflowers|7FQRbf8gbKw8KZQZAJWxH2|222546",
  song: "song/paul-cardall-sleeping-flowers",
  carriedBy: [
    {
      release: "release/paul-cardall-december-piano-string-ensemble",
      discNumber: 1,
      position: 5,
      externalId: "0I4B7VNDyv1kazcvnQFl5c",
      externalLink: "https://open.spotify.com/track/0I4B7VNDyv1kazcvnQFl5c",
    },
  ],
} as const satisfies Track
