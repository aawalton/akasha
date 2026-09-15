import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperEsoGenerateHudSceneCatalog = {
  id: "01a0685d-f8fa-75a7-b5b7-54361655f76a",
  type: "page-type/command",
  slug: "temper-eso-generate-hud-scene-catalog",
  definition: "the command writing the catalog of HUD parts out of the game's own scene source",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The catalog is read out of the game's own scene source rather than hand-written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One record is taken for each distinct component the scene source names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The records are divided into three modules by how the game hides the part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A call naming no checkout writes into what `CODE_ROOT` names, else this repository.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run parses by the rules sitting beside that run rather than by the tree's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A scene source naming no component refuses the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A rendered module over the akasha ceiling refuses the call and nothing is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The checkout written into is named on the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The catalog lands as one mechanical change rather than written by this command.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A module the checkout already has is left out of that change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The three modules are written into the folder the hud components already sit in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That folder is spelled here rather than read off a page sitting in it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A move of that folder is respelled here by hand, because nothing imports it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A rendered module names what it imports from the root rather than by a relative path.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A component the game creates at runtime is outside this catalog.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes the clone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that wrote before it threw says in its refusal what that run had written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test seam is taken after the world, so a real call reaches the work.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument this command does not take is refused rather than passed over.",
    },
  ],
  name: "hud-scene-catalog",
  arguments: [{ argument: "argument/code-root" }],
} as const satisfies Command
