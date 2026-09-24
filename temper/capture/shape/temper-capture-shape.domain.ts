import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCaptureShape = {
  id: "01a0604d-23a0-70d4-9f11-7c21f7a7d1bc",
  type: "page-type/domain",
  slug: "temper-capture-shape",
  definition: "the shape of every catalog the addon captures out of the running game",
  parts: [
    "module/achievement-catalog",
    "module/antiquity-lore-catalog",
    "module/cadwell-catalog",
    "module/class-catalog",
    "module/collectibles-catalog",
    "module/companion-equipment-catalog",
    "module/companion-skill-catalog",
    "module/currency-catalog",
    "module/engine-globals-catalog",
    "module/furniture-catalog",
    "module/interface-color-catalog",
    "module/interface-string-catalog",
    "module/inventory-constants-catalog",
    "module/item-set-catalog",
    "module/lore-library-catalog",
    "module/poi-catalog",
    "module/recipe-catalog",
    "module/scribing-catalog",
    "module/skill-catalog",
    "module/trait-research-catalog",
    "module/tribute-catalog",
    "module/zone-completion-catalog",
    "module/engine-answer-catalog",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalog here states a shape rather than holding the captured data.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A field name here is the name the addon writes into the saved variables.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "No module here has code that runs.",
    },
  ],
} as const satisfies Domain
