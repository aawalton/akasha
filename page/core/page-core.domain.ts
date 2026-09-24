import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageCore = {
  id: "01a05b92-a9c7-7180-bdd4-8e13e47841e5",
  type: "page-type/domain",
  slug: "page-core",
  definition: "what a page's values mean before any store or screen",

  parts: [
    "domain/page-core-filter",
    "domain/page-core-generated",
    "domain/page-core-json-patch",
    "domain/page-core-property-type",
    "domain/page-core-schema",
    "domain/page-core-view",
    "domain/page-core-view-state",
    "module/as-json",
    "module/icon",
    "module/media-formats",
    "module/null-ordering",
    "module/page-data",
    "module/page-name",
    "module/page-types",
    "module/resolve-badge-variant",
    "module/task-lifecycle",
    "module/titled-as",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A property type answers for its own values rather than the store answering for all the values.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A view is worked out from the rows handed to the view rather than asked of a server.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a network or a disk.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here draws a screen.",
    },

    {
      decisionKind: "decision-kind/gap",
      statement: "The icon index is written by a command no page here names.",
    },
  ],
} as const satisfies Domain
