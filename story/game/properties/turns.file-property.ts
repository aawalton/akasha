import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const turns = {
  id: "01a0673c-8e0e-7014-8deb-3231aa6c6114",
  type: "page-type/file-property",
  slug: "turns",
  propertySlug: "turns",
  definition: "every turn a game has been played through",
  extensions: ["jsonl"],
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "A turn row holds no snapshot of the state that turn left behind.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
