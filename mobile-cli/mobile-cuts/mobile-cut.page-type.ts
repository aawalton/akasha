import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { AppSlug } from "../../readout-system/readout-widgets/properties/app-slug.relation-property.ts"
import type { BuildInputTreeHash } from "./properties/build-input-tree-hash.text-property.ts"
import type { BuildNumber } from "./properties/build-number.number-property.ts"
import type { CutAt } from "./properties/cut-at.instant-property.ts"
import type { MainSha } from "./properties/main-sha.text-property.ts"
import type { ShellSha } from "./properties/shell-sha.text-property.ts"

export type MobileCut = Page & {
  title: Title
  appSlug: AppSlug
  buildNumber: BuildNumber
  mainSha: MainSha
  shellSha?: ShellSha
  buildInputTreeHash?: BuildInputTreeHash
  cutAt: CutAt
}

export const mobileCut = {
  id: "019f5141-c410-7cd1-b491-d017f10e568d",
  pageTypeSlug: "page-type",
  slug: "mobile-cut",
  definition: "one build of an app, and the state of the tree it was built from",
  pluralSlug: "mobile-cuts",
  extendsSlug: ["page-type/page"],
  partSlugs: [
    "instant-property/cut-at",
    "number-property/build-number",
    "text-property/build-input-tree-hash",
    "text-property/main-sha",
    "text-property/shell-sha",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "relation-property/app-slug", required: true, many: false },
    { pagePropertySlug: "build-number", required: true, many: false },
    { pagePropertySlug: "main-sha", required: true, many: false },
    { pagePropertySlug: "shell-sha", required: false, many: false },
    { pagePropertySlug: "build-input-tree-hash", required: false, many: false },
    { pagePropertySlug: "cut-at", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cut is named for its app and its build number.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cut made before the build input tree hash was recorded carries none and reads as owed.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which cut is newest is settled by its build number rather than by when its file landed.",
    },
    {
      invariantKind: "departure",
      statement: "A cut names the app it is of rather than repeating what that app is.",
    },
  ],
} as const satisfies PageType
