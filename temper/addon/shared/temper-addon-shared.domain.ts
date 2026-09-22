import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperAddonShared = {
  id: "01a0c602-d7a2-7ba5-a4a1-a50edd20bb46",
  type: "page-type/domain",
  slug: "temper-addon-shared",
  definition: "source more than one addon compiles into its own bundle",
  parts: [
    "domain/temper-addon-log",
    "domain/temper-hud-component",
    "domain/temper-helpers",
    "domain/temper-narrow",
    "domain/temper-settings-panel",
    "module/guild-store-poster",
    "module/reload-ui",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Source here is compiled into an addon's bundle rather than loaded on its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An addon the game loads from a folder of its own is a page rather than a part here.",
    },
  ],
} as const satisfies Domain
