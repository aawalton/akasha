import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const change = {
  id: "01a05df1-e261-76a1-ad1e-0db3d857450e",
  type: "page-type",
  slug: "change",
  definition: "a mechanical change whose bodies are answered rather than written",
  pluralSlug: "changes",
  extends: ["page-type/module"],
  parts: [
    "boolean-property/takes-at-most",
    "boolean-property/temporary",
    "domain/change-target",
    "module/change-answer",
    "module/change-guarding",
    "module/edits-dropping",
    "module/edits-keeping",
    "module/gated-landing",
    "module/gated-write",
    "module/key-requiring",
    "module/literal-splicing",
    "module/package-naming",
    "module/page-claiming",
    "module/page-knowing",
    "module/page-literal",
    "module/page-type-renaming",
    "page-type/change-agent",
    "page-type/change-guard",
    "page-type/change-kind",
    "page-type/change-mechanical",
    "module/change-shadow",
    "module/change-shadow-tree",
    "module/file-carrying",
    "module/import-lines",
    "module/json-entries",
    "page-type/change-mode",
    "page-type/change-runner",
    "relation-property/change-kind",
    "relation-property/change-mode",
    "module/target-kinding",
    "module/target-narrowing",
    "module/value-carrying",
    "number-property/change-max-cpu-seconds",
    "relation-property/change-target-subtype",
    "relation-property/change-target-type",
  ],
  properties: [
    { pageProperty: "relation-property/change-kind", required: true, many: false },
    { pageProperty: "boolean-property/temporary", required: false, many: false, default: "false" },
    {
      pageProperty: "boolean-property/takes-at-most",
      required: false,
      many: false,
      default: "false",
    },
    { pageProperty: "relation-property/change-mode", required: true, many: false },
    {
      pageProperty: "relation-property/change-target-type",
      required: false,
      many: false,
    },
    {
      pageProperty: "relation-property/change-target-subtype",
      required: false,
      many: false,
    },
    { pageProperty: "number-property/change-max-cpu-seconds", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A change the command line reaches reads the arguments handed in rather than trusting the arguments.",
    },
    {
      invariantKind: "departure",
      statement:
        "An argument such a change was handed no value for is refused by the key naming that argument.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change's slug names the mode then the thing acted on then the part of that thing.",
    },
    {
      invariantKind: "departure",
      statement:
        "The kind of file a path names is read from `target-kinding` rather than worked out in each change.",
    },
    {
      invariantKind: "departure",
      statement: "The path a change acts on is named `at`.",
    },
    {
      invariantKind: "departure",
      statement: "The paths a change moves a thing between are named `from` and `to`.",
    },
    {
      invariantKind: "departure",
      statement: "A change naming a page rather than a path names it for what the page is here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change acts only on a target whose kind narrows the subtype that change states.",
    },
    {
      invariantKind: "departure",
      statement: "That subtype is judged before the change runs rather than inside the change.",
    },
  ],
  types: "ts",
} as const satisfies PageType
