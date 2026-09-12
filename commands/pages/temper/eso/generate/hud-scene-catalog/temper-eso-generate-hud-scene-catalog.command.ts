import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperEsoGenerateHudSceneCatalog = {
  id: "01a0685d-f8fa-75a7-b5b7-54361655f76a",
  type: "command",
  slug: "temper-eso-generate-hud-scene-catalog",
  definition: "the command writing the catalog of HUD parts out of the game's own scene source",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The catalog is read out of the game's own scene source rather than hand-written.",
    },
    {
      invariantKind: "departure",
      statement: "One record is taken for each distinct component the scene source names.",
    },
    {
      invariantKind: "departure",
      statement: "The records are divided into three modules by how the game hides the part.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call naming no checkout writes into what `CODE_ROOT` names, else this repository.",
    },
    {
      invariantKind: "departure",
      statement: "A run parses by the rules sitting beside that run rather than by the tree's.",
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
      invariantKind: "departure",
      statement: "The catalog lands as one mechanical change rather than written by this command.",
    },
    {
      invariantKind: "departure",
      statement: "A module the checkout already has is left out of that change.",
    },
    {
      invariantKind: "departure",
      statement: "The three modules are written into the folder the hud components already sit in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rendered module names what it imports from the root rather than by a relative path.",
    },
    {
      invariantKind: "absence",
      statement: "A component the game creates at runtime is outside this catalog.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the clone.",
    },
    {
      invariantKind: "departure",
      statement: "A run that wrote before it threw says in its refusal what that run had written.",
    },
    {
      invariantKind: "departure",
      statement: "A test seam is taken after the world, so a real call reaches the work.",
    },
    {
      invariantKind: "departure",
      statement: "An argument this command does not take is refused rather than passed over.",
    },
  ],
  name: "hud-scene-catalog",
  arguments: [{ argument: "argument/code-root" }],
} as const satisfies Command
