import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"

export type Namespace = Domain

export const namespace = {
  id: "01a06c7c-54b5-712b-b4a2-9ada10279dff",
  pageTypeSlug: "page-type",
  slug: "namespace",
  definition: "a domain gathering the commands whose slugs open with its own and a hyphen",
  pluralSlug: "namespaces",
  extendsSlug: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A namespace's parts are the commands spelled under the namespace.",
    },
    {
      invariantKind: "departure",
      statement: "A command's slug opens with the slug of its namespace and a hyphen.",
    },
    {
      invariantKind: "departure",
      statement:
        "A namespace under another namespace opens its own slug with the outer slug and a hyphen.",
    },
    {
      invariantKind: "departure",
      statement: "A command's parent is its namespace rather than a domain.",
    },
    {
      invariantKind: "departure",
      statement: "Every namespace is a part of the `command` page type.",
    },
    {
      invariantKind: "absence",
      statement: "A namespace adds no scope for a slug to be unique within.",
    },
    {
      invariantKind: "absence",
      statement: "A namespace carries no code of its own.",
    },
  ],
} as const satisfies PageType
