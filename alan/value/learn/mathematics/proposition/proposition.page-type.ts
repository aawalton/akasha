import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const proposition = {
  id: "01a06575-c2ab-7655-98f1-b3163771f0dc",
  type: "page-type",
  slug: "proposition",
  definition: "one statement in the formal system Alan is building",
  extends: ["page-type/page"],
  parts: [
    "file-property/statement",
    "select-property/proposition-kind",
    "select-property/proposition-status",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/proposition-kind", required: true, many: false },
    { pageProperty: "select-property/proposition-status", required: true, many: false },
    { pageProperty: "file-property/statement", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A proposition's statement sits in its own file rather than in a value beside that file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An adopted proposition is chosen rather than proved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An adopted proposition has no proof.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A proposition names no proof that attempts that proposition.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
