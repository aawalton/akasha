import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineJeansBoysJesusTalkOfTheTown = {
  id: "01a0c621-1970-7204-b8e4-0c3ac320a59c",
  type: "page-type/track",
  slug: "jenna-raine-jeans-boys-jesus-talk-of-the-town",
  ownLength: 3.0891,
  ownProgress: 3.0891,
  partOfCollections: [
    "release/jenna-raine-jeans-boys-jesus",
    "release/jenna-raine-talk-of-the-town",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Talk Of The Town",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jenna-raine" }],
  trackKey: "talkofthetown|3aHe9rMa5HFTjXHw8tEz0A|185346",
  song: "song/jenna-raine-talk-of-the-town",
  carriedBy: [
    {
      release: "release/jenna-raine-jeans-boys-jesus",
      discNumber: 1,
      position: 8,
      externalId: "4um31MUXi9Ba2cwG9FjXMp",
      externalLink: "https://open.spotify.com/track/4um31MUXi9Ba2cwG9FjXMp",
    },
    {
      release: "release/jenna-raine-talk-of-the-town",
      discNumber: 1,
      position: 1,
      externalId: "3vDnYNZK21uZxBAGsPuWjz",
      externalLink: "https://open.spotify.com/track/3vDnYNZK21uZxBAGsPuWjz",
    },
  ],
} as const satisfies Track
