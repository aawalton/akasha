import type { IosComponent } from "../../ios-component.page-type.ts"

export const tier = {
  id: "01a05482-22df-7a91-9e4d-ba72f93c5851",
  pageTypeSlug: "ios-component",
  slug: "tier",
  definition: "the color a reading has reached",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tier's colors are the phone's own rather than chosen ones.",
    },
    {
      invariantKind: "departure",
      statement: "Black is the rung a reading sits at before it has moved.",
    },
  ],
} as const satisfies IosComponent
