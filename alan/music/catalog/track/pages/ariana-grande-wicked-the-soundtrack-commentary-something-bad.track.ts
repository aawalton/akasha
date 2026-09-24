import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedTheSoundtrackCommentarySomethingBad = {
  id: "01a0a6c5-49f5-72c6-93f1-a330f81af7d7",
  type: "page-type/track",
  slug: "ariana-grande-wicked-the-soundtrack-commentary-something-bad",
  ownLength: 1.805,
  ownProgress: 1.805,
  partOfCollections: [
    "release/ariana-grande-wicked-the-soundtrack-commentary",
    "release/ariana-grande-wicked-the-soundtrack",
    "release/musical-theater-wicked-the-soundtrack",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Something Bad",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/peter-dinklage" }, { artist: "artist/cynthia-erivo" }],
  trackKey: "somethingbad|0pHTIdyC4DAsoMhpSufQaz,46UMQ0cW8ToR8egkBRwAxZ|108300",
  song: "song/ariana-grande-something-bad",
  carriedBy: [
    {
      release: "release/ariana-grande-wicked-the-soundtrack",
      discNumber: 1,
      position: 5,
      externalId: "6hHr31QnEybBSpH8G4yJji",
      externalLink: "https://open.spotify.com/track/6hHr31QnEybBSpH8G4yJji",
    },
    {
      release: "release/ariana-grande-wicked-the-soundtrack-commentary",
      discNumber: 1,
      position: 11,
      externalId: "7KwGGUydPNh0h5V5Zy6OBB",
      externalLink: "https://open.spotify.com/track/7KwGGUydPNh0h5V5Zy6OBB",
    },
    {
      release: "release/musical-theater-wicked-the-soundtrack",
      discNumber: 1,
      position: 5,
      externalId: "5E2ASK5znLzoizBy4njhM4",
      externalLink: "https://open.spotify.com/track/5E2ASK5znLzoizBy4njhM4",
    },
  ],
} as const satisfies Track
