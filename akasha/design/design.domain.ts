import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const design = {
  id: "01a05b55-a539-7a1c-9bdc-5a459722f028",
  pageTypeSlug: "domain",
  slug: "design",
  definition: "how a thing is drawn on a screen and worked by hand",
  partSlugs: [
    "workspace-package/design-badges",
    "workspace-package/design-forms",
    "workspace-package/design-layout",
    "workspace-package/design-patterns",
    "workspace-package/design-primitives",
    "workspace-package/design-system",
    "workspace-package/design-tokens",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every design package is in akasha.",
    },
  ],
} as const satisfies Domain
