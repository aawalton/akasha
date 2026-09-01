import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type StageScript = Slug

export const stageScript = {
  id: "01a05cc9-7252-7942-b04c-ab8fc2d25564",
  pageTypeSlug: "relation-property",
  slug: "stage-script",
  propertySlug: "stage-script",
  definition: "the script that builds the site an app serves",
  targetPageTypeSlug: "page-type/shell-script",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An app stating no stage script serves whatever its package already carries.",
    },
    {
      invariantKind: "departure",
      statement: "What stages an app's site is read from its page rather than walked to.",
    },
  ],
} as const satisfies RelationProperty
