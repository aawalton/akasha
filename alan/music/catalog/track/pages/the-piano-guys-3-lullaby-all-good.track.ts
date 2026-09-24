import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyAllGood = {
  id: "01a0afa1-ddaa-7dad-aeec-b15357b68e52",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-all-good",
  ownLength: 2.3907166666666666,
  ownProgress: 2.3907166666666666,
  partOfCollections: [
    "release/the-piano-guys-3-lullaby",
    "release/the-piano-guys-peaceful-summer-nights",
    "release/the-piano-guys-relaxing-piano",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "All Good",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "allgood|0jW6R8CVyVohuUJVcuweDI|143443",
  song: "song/the-piano-guys-all-good",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-lullaby",
      discNumber: 1,
      position: 4,
      externalId: "2CVE8Vku4ZCs1Dv0BUHzQW",
      externalLink: "https://open.spotify.com/track/2CVE8Vku4ZCs1Dv0BUHzQW",
    },
    {
      release: "release/the-piano-guys-peaceful-summer-nights",
      discNumber: 1,
      position: 7,
      externalId: "1ejr8Z1mj6Wiiyx1dy42WB",
      externalLink: "https://open.spotify.com/track/1ejr8Z1mj6Wiiyx1dy42WB",
    },
    {
      release: "release/the-piano-guys-relaxing-piano",
      discNumber: 1,
      position: 10,
      externalId: "7ztlfchcq5H30fAlneiRIS",
      externalLink: "https://open.spotify.com/track/7ztlfchcq5H30fAlneiRIS",
    },
  ],
} as const satisfies Track
