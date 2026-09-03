import type { Refusal } from "../refusal.page-type.ts"

export const pageKeyUndeclared = {
  id: "01a06611-3995-736d-bf67-fc1b2ba90379",
  pageTypeSlug: "refusal",
  slug: "page-key-undeclared",
  title: "Page key undeclared",
  text: "`{key}` is no property of `{slug}` or of anything it extends",
} as const satisfies Refusal
