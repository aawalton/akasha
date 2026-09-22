import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const attribute = {
  id: "01a06841-a0fd-7d6d-83ba-fed205a8f26a",
  type: "page-type/page-type",
  slug: "attribute",
  definition: "a capacity Alan builds through a daily habit",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "attribute" },
    { partOfSpeech: "part-of-speech/noun", spelling: "attributes" },
  ],
  extends: ["page-type/domain"],
  parts: [
    "attribute/charisma",
    "attribute/constitution",
    "attribute/endurance",
    "attribute/intelligence",
    "attribute/luck",
    "attribute/strength",
    "attribute/wisdom",
    "domain/attribute-readout",
    "text-property/point-unit",
    "module/attribute-level",
  ],
  properties: [
    { pageProperty: "code-file-property/code", required: false, many: false },
    { pageProperty: "code-file-property/test", required: false, many: false },
    { pageProperty: "text-property/point-unit", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute's point unit never changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Points are counted forward from the day an attribute begins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No earlier day is backfilled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Recalibrating the daily target leaves an attribute's point unit unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute shown as no daily light earns points all the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An attribute's total points and the level those points reach are added up when asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code beside an attribute's page earns that attribute its points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A readout counting an attribute takes that attribute's points for the day it draws.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
