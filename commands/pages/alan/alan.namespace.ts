import type { Namespace } from "../../namespaces/namespace.page-type.types.ts"

export const alan = {
  id: "01a082fd-068b-7435-8084-4831d4e3370a",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "alan",
  definition: "Alan's own days, what he eats and what he is learning",
  parts: [
    "command/alan-elaine",
    "command/alan-food",
    "command/alan-learn-next",
    "command/alan-tracking",
  ],
} as const satisfies Namespace
