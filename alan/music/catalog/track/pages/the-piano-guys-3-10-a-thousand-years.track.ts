import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310AThousandYears = {
  id: "01a0afa2-0d60-7bb2-86f2-62c9877676ed",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-a-thousand-years",
  ownLength: 4.50735,
  ownProgress: 4.50735,
  partOfCollections: [
    "release/the-piano-guys-3-10",
    "release/the-piano-guys-3-classical-love-romance",
    "release/the-piano-guys-the-piano-guys-solo-sessions-jon-schmidt-vol-1",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "A Thousand Years",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "athousandyears|0jW6R8CVyVohuUJVcuweDI|270441",
  song: "song/evynne-hollens-a-thousand-years",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 2,
      position: 11,
      externalId: "1n3X12SV936VFhCzASRJQj",
      externalLink: "https://open.spotify.com/track/1n3X12SV936VFhCzASRJQj",
    },
    {
      release: "release/the-piano-guys-3-classical-love-romance",
      discNumber: 1,
      position: 1,
      externalId: "4mo9EDiWqmsAF3uJDAHccy",
      externalLink: "https://open.spotify.com/track/4mo9EDiWqmsAF3uJDAHccy",
    },
    {
      release: "release/the-piano-guys-the-piano-guys-solo-sessions-jon-schmidt-vol-1",
      discNumber: 1,
      position: 7,
      externalId: "08fRXYBpsLdN3r7RvFLpof",
      externalLink: "https://open.spotify.com/track/08fRXYBpsLdN3r7RvFLpof",
    },
  ],
} as const satisfies Track
