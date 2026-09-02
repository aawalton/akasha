import type { EsoAddon } from "../../code-system/eso-addon/eso-addon.page-type.ts"

export const temperInterfaceAddon = {
  id: "01a060e7-1bea-7ec8-9343-b0e442437b98",
  pageTypeSlug: "eso-addon",
  slug: "temper-interface-addon",
  definition: "the add-on holding the interface tweaks that no other add-on has a home for",
  manifest: "json",
  addonManifest: "json",
  partSlugs: [
    "module/assistant-collectibles",
    "module/assistant-bindings",
    "module/assistant-entry",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Three separate add-ons were folded into this one.",
    },
    {
      invariantKind: "departure",
      statement: "A keybind is named after the assistant the player has unlocked.",
    },
  ],
} as const satisfies EsoAddon
