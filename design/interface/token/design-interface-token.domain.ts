import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const designInterfaceToken = {
  id: "01a05c97-52ff-77b0-98f7-72e4e4e986e4",
  type: "page-type/domain",
  slug: "design-interface-token",
  definition: "the named values an interface uses",
  parts: [
    "module/semantic-color",
    "module/color-shape",
    "module/text-color",
    "module/surface-color",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every color here is mirrored by a custom property `tokens.css` declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A color here is held as an sRGB tuple.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every tuple here is worked out from the hex a color page states.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No color is written out here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names the use of any color.",
    },
  ],
} as const satisfies Domain
