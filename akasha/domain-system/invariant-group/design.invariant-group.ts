import type { InvariantGroup } from "./invariant-group.page-type.ts"

export const design = {
  id: "01a04e11-9f97-7f4d-b81a-c47eb0d7d43a",
  pageTypeSlug: "invariant-group",
  slug: "design",
  definition: "an invariant that holds now",
  directives: [
    {
      directiveKind: "rule",
      name: "Move When False",
      act: "Move a design entry to intent, or delete it, as soon as you find it no longer true.",
      warrant:
        "Design is read as true now, so one that has gone false misleads until somebody tests it.",
      aids: [
        "Move it if still meant, delete it if not.",
        "Never note the exception where it broke.",
      ],
    },
  ],
} as const satisfies InvariantGroup
