import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperAddon = {
  id: "01a0c454-aab8-797e-8865-0a27bc2013c4",
  type: "page-type/domain",
  slug: "temper-addon",
  definition: "the add-ons temper runs inside the game, and what builds them",
  parts: [
    "domain/temper-addon-library",
    "domain/temper-addon-library-type",
    "eso-addon/temper-capture-datamining-addon",
    "eso-addon/temper-capture-sales-addon",
    "eso-addon/temper-errors-addon",
    "eso-addon/temper-catalog-addon",
    "eso-addon/temper-collections-addon",
    "eso-addon/temper-quests-addon",
    "eso-addon/temper-hud-addon",
    "eso-addon/temper-selector-addon",
    "eso-addon/temper-events-addon",
    "domain/temper-addon-log",
    "domain/temper-narrow",
    "domain/temper-settings-panel",
    "eso-addon/temper-keybinder-addon",
    "domain/temper-community-addon",
    "domain/temper-hud-component",
  ],
} as const satisfies Domain
