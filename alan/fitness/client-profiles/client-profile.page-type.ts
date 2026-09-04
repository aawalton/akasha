import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../temper/temper-things/properties/title.text-property.ts"
import type { Bodyweight } from "./properties/bodyweight.number-property.ts"

export type ClientProfile = Page & {
  title: Title
  bodyweight?: Bodyweight
}

export const clientProfile = {
  id: "01a06834-ca85-7792-97d7-fe4d517a9382",
  pageTypeSlug: "page-type",
  slug: "client-profile",
  definition: "what the coach knows about the body she is training",
  pluralSlug: "client-profiles",
  extendsSlug: "page-type/page",
  partSlugs: ["number-property/bodyweight"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "bodyweight", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "One client profile page stands, and a second leaves neither of them holding.",
    },
    {
      invariantKind: "gap",
      statement:
        "Volume is counted against the weight this page states, never a number a caller hands in.",
    },
  ],
} as const satisfies PageType
