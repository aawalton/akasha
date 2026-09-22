import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperNotification = {
  id: "01a0c72a-85c8-7f52-9a11-b347634ce417",
  type: "page-type/domain",
  slug: "temper-notification",
  definition: "the rows an addon adds to the game's notifications panel",
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
      decisionKind: "decision-kind/constraint",
      statement: "The game's own row setup is replaced so a row may have its own icon.",
    },
  ],
} as const satisfies Domain
