import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperHudComponents = {
  id: "01a060a4-fa38-742d-9517-977730401b38",
  pageTypeSlug: "workspace-package",
  slug: "temper-hud-components",
  definition: "the parts of the game's HUD, each with the way the game hides that part",
  manifest: "json",
  partSlugs: [
    "module/hud-scene-source",
    "module/hud-component-record",
    "module/hud-component-labels",
    "module/hud-scene-parse",
    "module/hud-fragment-group",
    "module/hud-scene-fragments",
    "module/hud-controls",
    "module/hud-scene-catalog",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A part of the HUD is one fragment or one top-level control.",
    },
    {
      invariantKind: "departure",
      statement: "The catalog is read out of the game's own scene source rather than hand-written.",
    },
    {
      invariantKind: "departure",
      statement: "The name and category a person reads are hand-written here.",
    },
    {
      invariantKind: "departure",
      statement: "The catalog is data alone.",
    },
    {
      invariantKind: "absence",
      statement: "No game function is called here.",
    },
  ],
} as const satisfies WorkspacePackage
