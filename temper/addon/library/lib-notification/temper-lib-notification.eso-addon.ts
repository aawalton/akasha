import type { EsoAddon } from "akasha/code/eso-addon/eso-addon.page-type.types.ts"

export const temperLibNotification = {
  id: "01a0605a-0514-797f-9f36-a01b055a56fc",
  type: "page-type/eso-addon",
  slug: "temper-lib-notification",
  definition: "the rows an addon adds to the game's notifications panel",

  addonManifest: "json",
  bundleEntry: "module/notification-entry",
  parts: [
    "module/notification-casts",
    "module/notification-entry",
    "module/notification-names",
    "module/notification-provider-link",
    "module/notification-providers",
    "module/notification-row-overrides",
    "module/notification-types",
    "type-declaration/notification-declarations",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller gets one link table and puts every notification into that table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The keyboard panel gets a provider apart from the gamepad panel's provider.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refresh of the keyboard panel refreshes the gamepad panel too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Loading twice is an error rather than a second library.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's own row setup is replaced so a row may have its own icon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game reaches the library through two global names for one library.",
    },
  ],
} as const satisfies EsoAddon
