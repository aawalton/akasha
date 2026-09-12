import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const change = {
  id: "01a05df1-e261-76a1-ad1e-0db3d857450e",
  type: "page-type",
  slug: "change",
  definition: "a mechanical change whose bodies are answered rather than written",
  pluralSlug: "changes",
  extends: ["page-type/module"],
  parts: [
    "page-type/change-agent",
    "page-type/change-mechanical",
    "page-type/change-runner",
    "page-type/change-kind",
    "page-type/change-guard",
    "module/change-shadow",
    "module/change-shadow-tree",
    "module/change-guarding",
    "module/page-claiming",
    "module/page-type-renaming",
    "module/file-carrying",
    "module/page-knowing",
    "module/page-literal",
    "module/literal-splicing",
    "module/import-lines",
    "module/package-naming",
    "module/json-entries",
    "module/change-answer",
    "module/edits-keeping",
    "module/export-spelling",
    "page-type/change-mode",
    "relation-property/change-kind",
    "relation-property/change-mode",
    "relation-property/change-target-type",
    "relation-property/change-target-subtype",
    "domain/change-target",
    "module/target-kinding",
    "module/target-narrowing",
    "module/key-requiring",
    "module/value-carrying",
    "boolean-property/temporary",
    "boolean-property/takes-at-most",
    "number-property/change-max-cpu-seconds",
    "module/edits-dropping",
    "module/gated-landing",
    "module/gated-write",
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
        "The kind of file a path names is read from one module rather than worked out in each change.",
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
