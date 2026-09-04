import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const trackResolving = {
  id: "01a06281-4d9d-7004-9a0b-82fe940e4d95",
  pageTypeSlug: "module",
  slug: "track-resolving",
  definition: "the track and the device a play command acts on",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A track uri is `spotify:track:` followed by letters and digits.",
    },
    {
      invariantKind: "departure",
      statement: "A uri of any other shape names no track.",
    },
    {
      invariantKind: "departure",
      statement: "A query named beside an artist is searched ten hits deep.",
    },
    {
      invariantKind: "departure",
      statement: "A query named beside no artist is searched five hits deep.",
    },
    {
      invariantKind: "departure",
      statement: "A query resolves to the first candidate the artist wanted leaves.",
    },
    {
      invariantKind: "departure",
      statement: "A query no track answers is a data error.",
    },
    {
      invariantKind: "departure",
      statement: "A device named on the command line is the device acted on.",
    },
    {
      invariantKind: "departure",
      statement: "A device is looked for only where nothing is playing already.",
    },
    {
      invariantKind: "departure",
      statement: "The device looked for is the one Spotify calls active.",
    },
    {
      invariantKind: "departure",
      statement: "A device carrying an id is taken where Spotify calls none active.",
    },
    {
      invariantKind: "departure",
      statement: "No device left to take is an operational error.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Module
