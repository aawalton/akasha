import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export type ComponentPropertyGroupStated = Record<string, never>

export const componentPropertyGroup = {
  id: "01a09c84-34f2-7b18-839c-48ef7ff084e7",
  type: "page-type/page-type",
  slug: "component-property-group",
  definition: "a file property group held in a component's code",
  extends: ["page-type/file-property-group"],
  properties: [
    { pageProperty: "code-file-property/code", required: true, many: false, fixed: "tsx" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page carrying such a group has code under that group's slug drawing for a browser.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A group of this page type states no members of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page carrying the group states nothing about that file at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A component group's code file exports a component named `Drawing`.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
