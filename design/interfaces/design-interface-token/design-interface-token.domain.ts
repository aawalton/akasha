import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const designInterfaceToken = {
  id: "01a05c97-52ff-77b0-98f7-72e4e4e986e4",
  type: "domain",
  slug: "design-interface-token",
  definition: "the colors an interface is drawn in, each held as an sRGB tuple",
  parts: ["module/semantic-color", "module/color-shape", "module/text-color"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every color here is mirrored by a custom property `tokens.css` declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every tuple here is worked out from the hex a color page states.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No color is written out here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here names the use of any color.",
    },
  ],
} as const satisfies Domain
