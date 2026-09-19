import { filePropertyGroup } from "akasha/page/file-property-group/file-property-group.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

export const GROUPING = [
  { id: "1", pageTypeSlug: "page-type", slug: "file-property-group", properties: [] },
  {
    id: "2",
    pageTypeSlug: "page-type",
    slug: "module-property-group",
    extends: [`${pageType.slug}/${filePropertyGroup.slug}`],
    properties: [
      { pageProperty: "code-file-property/code", fixed: "ts" },
      { pageProperty: "code-file-property/test", fixed: "ts" },
      { pageProperty: "file-property/logs", uncommitted: true, default: "jsonl" },
    ],
  },
  {
    id: "3",
    pageTypeSlug: "page-type",
    slug: "check-code",
    properties: [{ pageProperty: "module-property-group/audit" }],
  },
]

export const ABOVE = [
  {
    id: "1",
    pageTypeSlug: "page-type",
    slug: "one",
    properties: [{ secret: true }, { pagePropertySlug: "patch", default: "one-default" }],
  },
  {
    id: "2",
    pageTypeSlug: "page-type",
    slug: "two",
    properties: [{ uncommitted: true }, { pagePropertySlug: "patch", default: "two-default" }],
  },
  {
    id: "3",
    pageTypeSlug: "page-type",
    slug: "both",
    extends: ["page-type/one", "page-type/two"],
  },
]
