import type { PageType } from "@akasha/pages/page-type"
import type { Domain } from "akasha/domains/domain.page-type.ts"

export type Namespace = Domain

export const namespace = {
  id: "01a06c7c-54b5-712b-b4a2-9ada10279dff",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "namespace",
  definition: "a domain gathering the commands whose slugs open with its own and a hyphen",
  pluralSlug: "namespaces",
  extends: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A namespace's parts are the commands and namespaces spelled under the namespace.",
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
      statement: "A namespace under another namespace is a part of the outer namespace.",
    },
    {
      invariantKind: "departure",
      statement: "A namespace under no namespace is a part of the `command` page type.",
    },
    {
      invariantKind: "departure",
      statement: "Every node of the command tree is a page.",
    },
    {
      invariantKind: "departure",
      statement: "A command is reached by walking the parts from the root.",
    },
    {
      invariantKind: "departure",
      statement: "The walk takes one word at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A word naming no part of the node reached stops the walk.",
    },
    {
      invariantKind: "absence",
      statement: "A namespace adds no scope for a slug to be unique within.",
    },
    {
      invariantKind: "absence",
      statement: "A namespace has no code of its own.",
    },
  ],
} as const satisfies PageType
