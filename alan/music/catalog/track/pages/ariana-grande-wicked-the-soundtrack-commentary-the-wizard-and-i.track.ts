import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedTheSoundtrackCommentaryTheWizardAndI = {
  id: "01a0a6c5-4977-7246-a54e-f1aca0ae8845",
  type: "page-type/track",
  slug: "ariana-grande-wicked-the-soundtrack-commentary-the-wizard-and-i",
  ownLength: 5.6143,
  ownProgress: 5.6143,
  partOfCollections: [
    "release/ariana-grande-wicked-the-soundtrack-commentary",
    "release/ariana-grande-wicked-the-soundtrack",
    "release/musical-theater-wicked-the-soundtrack",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "The Wizard And I",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/cynthia-erivo" }, { artistName: "Michelle Yeoh" }],
  trackKey: "thewizardandi|46UMQ0cW8ToR8egkBRwAxZ,5IaJcuBeBkVqhGAzxMciwu|336858",
  song: "song/ariana-grande-the-wizard-and-i",
  carriedBy: [
    {
      release: "release/ariana-grande-wicked-the-soundtrack",
      discNumber: 1,
      position: 3,
      externalId: "1foaMdjhl4LNVQFYxMZANx",
      externalLink: "https://open.spotify.com/track/1foaMdjhl4LNVQFYxMZANx",
    },
    {
      release: "release/ariana-grande-wicked-the-soundtrack-commentary",
      discNumber: 1,
      position: 7,
      externalId: "7f5TtZfS8rDAsDHS9E6fou",
      externalLink: "https://open.spotify.com/track/7f5TtZfS8rDAsDHS9E6fou",
    },
    {
      release: "release/musical-theater-wicked-the-soundtrack",
      discNumber: 1,
      position: 3,
      externalId: "4mxj6SQ7BxfQ90CBTbxcwH",
      externalLink: "https://open.spotify.com/track/4mxj6SQ7BxfQ90CBTbxcwH",
    },
  ],
} as const satisfies Track
