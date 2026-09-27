import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCharactersCaptureAddon = {
  id: "01a0616b-4d21-7c3e-9b48-5f0a2c81d6e4",
  type: "page-type/domain",
  slug: "temper-characters-capture-addon",
  definition: "what the game answers about the character playing now, read out as a build hash",
  parts: [
    "module/character-capture-alliance-map",
    "module/character-capture-base-ability",
    "module/character-capture-build",
    "module/character-capture-champion-point-map",
    "module/character-capture-class-map",
    "module/character-capture-codec",
    "module/character-capture-codec-constants",
    "module/character-capture-codec-types",
    "module/character-capture-curse-map",
    "module/character-capture-enchant-quality",
    "module/character-capture-encoder",
    "module/character-capture-equipment",
    "module/character-capture-equipment-map",
    "module/character-capture-food-map",

    "module/character-capture-mundus-map",
    "module/character-capture-passive-map",
    "module/character-capture-potion-map",
    "module/character-capture-race-map",
    "module/character-capture-scribing",
    "module/character-capture-scribing-map",
    "module/character-capture-set-index-00",
    "module/character-capture-set-map",

    "module/character-capture-skill-line-groups",
    "module/character-capture-skill-line-map",
    "module/character-capture-skill-line-ranks",
    "module/character-capture-skill-map",
    "module/character-capture-skill-pages",
    "module/character-capture-scribed-skill-map",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A place in these tables is the number a saved build hash has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "These tables are committed source, compiled into whichever add-on imports them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Skill and skill line places, ranks and morphs are read from their pages as the add-on compiles.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a build hash back.",
    },
  ],
} as const satisfies Domain
