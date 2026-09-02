import type { Module } from "@akasha/code-system/module"

export const hudAddonHideInit = {
  id: "01a061c5-18dd-700d-bb0a-48630caac89d",
  pageTypeSlug: "module",
  slug: "hud-addon-hide-init",
  definition:
    "the registration of every catalog part as hideable under the player's stored setting",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A part the player has said nothing about is shown.",
    },
    {
      invariantKind: "departure",
      statement: "The performance meter is the one part hidden by default.",
    },
    {
      invariantKind: "departure",
      statement: "The hiding is carried out again whenever the HUD scene changes state.",
    },
    {
      invariantKind: "departure",
      statement: "The hiding is carried out again whenever the player is activated.",
    },
    {
      invariantKind: "departure",
      statement: "Registration happens once.",
    },
  ],
} as const satisfies Module
