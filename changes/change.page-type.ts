import type { Module } from "../code-system/modules/module.page-type.ts"
import type { PageType } from "../pages/types/page-type.page-type.ts"

export type Change = Module

export const change = {
  id: "01a05df1-e261-76a1-ad1e-0db3d857450e",
  pageTypeSlug: "page-type",
  slug: "change",
  definition: "a mechanical change whose bodies are answered rather than written",
  pluralSlug: "changes",
  extendsSlug: ["page-type/module"],
  partSlugs: [
    "page-type/atomic-change",
    "page-type/refactor-change",
    "page-type/change-partial",
    "page-type/workflow-template",
    "page-type/change-kind",
    "workspace-package/workflow-language",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing lands but through an akasha command or a service.",
    },
    {
      invariantKind: "departure",
      statement: "The checks a change is judged by follow from its kind.",
    },
    {
      invariantKind: "departure",
      statement: "No service lands a body an agent composed.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every command's page names the kind of change that command lands where the call names no other.",
    },
    {
      invariantKind: "departure",
      statement: "A command that lands is handed its change kind rather than a boolean.",
    },
  ],
  directives: [
    {
      directiveKind: "principle",
      name: "Land In Pieces",
      act: "Split a change into landings that each stand on their own.",
      warrant: "A change too large to gather in one sitting is stale before it lands.",
      aids: [
        "Make the reader take both shapes first.",
        "Keep it whole only where half would read wrong.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Mechanical By Command",
      act: "Use the command for a move, a remove, a refactor or a replace rather than editing by hand.",
      warrant:
        "A command changes every place at once, and by hand you reach only the places you saw.",
      aids: [
        "A change you could write as a rule likely has a command.",
        "The places you miss break quietly.",
      ],
    },
  ],
} as const satisfies PageType
