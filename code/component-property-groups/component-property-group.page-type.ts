import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export type ComponentPropertyGroupStated = Record<string, never>

export const componentPropertyGroup = {
  id: "01a09c84-34f2-7b18-839c-48ef7ff084e7",
  type: "page-type",
  slug: "component-property-group",
  definition: "a file property group held in a component's code, test and test fixtures",
  pluralSlug: "component-property-groups",
  extends: ["page-type/file-property-group"],
  properties: [
    {
      pageProperty: "code-file-property/component-code",
      required: true,
      many: false,
      fixed: "tsx",
    },
    {
      pageProperty: "code-file-property/component-test",
      required: false,
      many: false,
      fixed: "tsx",
    },
    {
      pageProperty: "code-file-property/component-test-fixtures",
      required: false,
      many: false,
      fixed: "tsx",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page carrying such a group has code under that group's slug drawing for a browser.",
    },
    {
      invariantKind: "departure",
      statement: "A group of this page type states no members of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A page carrying the group states nothing about these files at all.",
    },
  ],
  types: "ts",
} as const satisfies PageType
