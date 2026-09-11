import type { IosComponent } from "akasha/code/ios-components/ios-component.page-type.types.ts"

export const tier = {
  id: "01a05482-22df-7a91-9e4d-ba72f93c5851",
  pageTypeSlug: "ios-component",
  type: "ios-component",
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
      statement: "Black is the rung a reading sits at before the reading has moved.",
    },
    {
      invariantKind: "departure",
      statement: "Where a reading sits among rungs is worked out the way the server works it.",
    },
    {
      invariantKind: "departure",
      statement: "A reading reaches the highest rung whose number the reading has gone over.",
    },
    {
      invariantKind: "departure",
      statement: "A scale whose numbers shrink from black through blue is read as a falling one.",
    },
    {
      invariantKind: "departure",
      statement: "A scale of fewer than two rungs is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A scale neither climbing nor falling is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A reading that is no finite number reaches no rung.",
    },
    {
      invariantKind: "departure",
      statement: "The fraction between two rungs is held between nothing and one.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a scale page or says which rungs a scale has.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the black rung in under a climbing scale.",
    },
    {
      invariantKind: "gap",
      statement: "This placing and the server's are held together by the harness alone.",
    },
  ],
} as const satisfies IosComponent
