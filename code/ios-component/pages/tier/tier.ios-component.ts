import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const tier = {
  id: "01a05482-22df-7a91-9e4d-ba72f93c5851",
  type: "page-type/ios-component",
  slug: "tier",
  definition: "the color a reading has reached",
  swift: "swift",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tier's colors are the phone's own rather than chosen ones.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Black is the rung a reading sits at before the reading has moved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where a reading sits among rungs is worked out the way the server works it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading reaches the highest rung whose number the reading has gone over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A scale whose numbers shrink from black through blue is read as a falling one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A scale of fewer than two rungs is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A scale neither climbing nor falling is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading that is no finite number reaches no rung.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The fraction between two rungs is held between nothing and one.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a scale page or says which rungs a scale has.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the black rung in under a climbing scale.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "This placing and the server's are held together by the harness alone.",
    },
  ],
} as const satisfies IosComponent
