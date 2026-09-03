import type { Command } from "@akasha/command-system/command"

export const esoGenerateHudSceneCatalog = {
  id: "01a0685d-f8fa-75a7-b5b7-54361655f76a",
  pageTypeSlug: "command",
  slug: "eso-generate-hud-scene-catalog",
  definition: "the command writing the catalog of HUD parts out of the game's own scene source",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    {
      said: "--code-root <path>",
      takes: "the checkout the catalog is written into",
    },
  ],
  helpNotes: [
    "the checkout defaults to what `CODE_ROOT` names, and to this repository where that names nothing.",
    "the source is the one clone file declaring the main gameplay scene, and one record is taken for each distinct component it names.",
    "what counts as a component and what shape a record takes come from the package declaring them, so a run parses by the rules standing beside it rather than by the tree's.",
    "the records are written as three modules divided by how the game hides the part: a fragment group, a scene fragment, or a top-level control.",
    "a component the game parents to GuiRoot and creates at runtime is outside a single-file walk, and so outside this catalog.",
    "a scene source naming no component refuses the call, because an empty catalog reads to every consumer as a clean answer.",
    "a rendered module over the fifteen thousand byte akasha ceiling refuses the call and is a sign the catalog wants dividing further.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The catalog is read out of the game's own scene source rather than hand-written.",
    },
    {
      invariantKind: "departure",
      statement: "A run parses by the rules standing beside it rather than by the tree's.",
    },
    {
      invariantKind: "departure",
      statement: "A scene source naming no component refuses the call.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rendered module over the akasha ceiling refuses the call and nothing is written.",
    },
    {
      invariantKind: "departure",
      statement: "The checkout written into is named on the call.",
    },
    {
      invariantKind: "absence",
      statement: "A component the game creates at runtime is outside this catalog.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the clone.",
    },
  ],
} as const satisfies Command
