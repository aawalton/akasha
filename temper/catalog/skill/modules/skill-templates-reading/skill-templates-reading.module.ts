import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillTemplatesReading = {
  id: "01a0de72-b25e-78d7-a1ee-d4d009422dd0",
  type: "page-type/module",
  slug: "skill-templates-reading",
  definition: "the reading of the skills a character build takes from skill pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill is at the build-hash place its page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page a skill names is read as the key that page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page naming a page that states no key throws rather than reading a skill.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A description held as quoted text is read as the text inside the quotes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The no-skill sentinel sits under no skill line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here reads a file, so a browser and a server read skills alike.",
    },
  ],
} as const satisfies Module
