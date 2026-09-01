import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const design = {
  id: "01a05b55-a539-7a1c-9bdc-5a459722f028",
  pageTypeSlug: "domain",
  slug: "design",
  definition: "how a thing is drawn on a screen and worked by hand",
  partSlugs: [
    "workspace-package/design-badges",
    "workspace-package/design-forms",
    "workspace-package/design-layout",
  ],
} as const satisfies Domain
