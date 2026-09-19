import { audit } from "akasha/check/code/properties/audit.module-property-group.ts"
import { code } from "akasha/code/module/properties/code.code-file-property.ts"
import { test } from "akasha/code/module/properties/test.code-file-property.ts"
import { modulePropertyGroup } from "akasha/code/module-property-group/module-property-group.page-type.ts"
import { logs } from "akasha/code/module-property-group/properties/logs.file-property.ts"
import { codeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.ts"
import { fileProperty } from "akasha/page/file-property/file-property.page-type.ts"
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
      { pageProperty: `${codeFileProperty.slug}/${code.slug}`, fixed: "ts" },
      { pageProperty: `${codeFileProperty.slug}/${test.slug}`, fixed: "ts" },
      { pageProperty: `${fileProperty.slug}/${logs.slug}`, uncommitted: true, default: "jsonl" },
    ],
  },
  {
    id: "3",
    pageTypeSlug: "page-type",
    slug: "check-code",
    properties: [{ pageProperty: `${modulePropertyGroup.slug}/${audit.slug}` }],
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
