import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const trackKey = {
  id: "01a0a620-826b-7e60-9d85-16c3162b769c",
  type: "page-type/text-property",
  slug: "track-key",
  propertySlug: "track-key",
  definition: "the text matching a track to the same track carried on another release",
  maxLength: 400,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A track key is the title, then the artists, then the length in milliseconds, parted by `|`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The title in a track key has only lowercase letters and digits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The artists in a track key are every artist the provider credits, sorted and parted by `,`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two tracks with one track key are one recording carried on two releases.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
