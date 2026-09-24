import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineJeansBoysJesusSoFarSoGood = {
  id: "01a0c621-1785-79dc-ab05-d6b1c2b060d3",
  type: "page-type/track",
  slug: "jenna-raine-jeans-boys-jesus-so-far-so-good",
  ownLength: 3.3789666666666665,
  ownProgress: 3.3789666666666665,
  partOfCollections: ["release/jenna-raine-jeans-boys-jesus"],
  status: "completed",
  unit: "unit/minutes",
  title: "So Far, So Good",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jenna-raine" }],
  trackKey: "sofarsogood|3aHe9rMa5HFTjXHw8tEz0A|202738",
  song: "song/jenna-raine-so-far-so-good",
  carriedBy: [
    {
      release: "release/jenna-raine-jeans-boys-jesus",
      discNumber: 1,
      position: 12,
      externalId: "3vAhMW04vNTk5vFQJUfX0j",
      externalLink: "https://open.spotify.com/track/3vAhMW04vNTk5vFQJUfX0j",
    },
  ],
} as const satisfies Track
