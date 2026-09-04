import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../pages/pages/properties/title.text-property.ts"
import type { Declaration } from "./properties/declaration.file-property.ts"
import type { WorkflowClusterServiceSlugs } from "./properties/workflow-cluster-service-slugs.relation-property.ts"
import type { WorkflowKind } from "./properties/workflow-kind.select-property.ts"

export type WorkflowTemplate = Page & {
  title: Title
  workflowKind: WorkflowKind
  declaration: Declaration
  clusterServiceSlugs?: WorkflowClusterServiceSlugs
}

export const workflowTemplate = {
  id: "01a06810-7000-7003-b625-3d8a5f7c7104",
  pageTypeSlug: "page-type",
  slug: "workflow-template",
  definition: "a named group of steps a run carries out",
  pluralSlug: "workflow-templates",
  extendsSlug: "page-type/page",
  partSlugs: [
    "file-property/declaration",
    "relation-property/workflow-cluster-service-slugs",
    "select-property/workflow-kind",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "workflow-kind", required: true, many: false },
    { pagePropertySlug: "declaration", required: true, many: false },
    { pagePropertySlug: "workflow-cluster-service-slugs", required: false, many: true, max: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A workflow's steps stand in a file beside its page as a module's code does.",
    },
    {
      invariantKind: "departure",
      statement: "A workflow is a page with code beside it rather than a module.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing imports a workflow's declaration; the runner gathers them all.",
    },
    {
      invariantKind: "gap",
      statement: "The workflow language a declaration is written in stands outside akasha.",
    },
  ],
} as const satisfies PageType
