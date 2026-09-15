import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const runtimeError = {
  id: "01a05f3f-e3df-76da-ba22-9282e49c2d98",
  type: "page-type",
  slug: "runtime-error",
  definition: "one fault a client met, gathered under the fingerprint the fault hashes to",
  extends: ["page-type/page"],
  mortal: true,
  parts: [
    "instant-property/error-first-seen-at",
    "instant-property/error-last-seen-at",
    "number-property/error-count",
    "text-property/error-app",
    "text-property/error-fingerprint",
    "text-property/error-kind",
    "text-property/error-message",
    "text-property/error-release-sha",
    "text-property/error-url",
    "text-property/error-user-agent",
  ],
  properties: [
    { pageProperty: "text-property/error-fingerprint", required: true, many: false },
    { pageProperty: "text-property/error-app", required: true, many: false },
    { pageProperty: "text-property/error-kind", required: true, many: false },
    { pageProperty: "text-property/error-message", required: true, many: false },
    { pageProperty: "text-property/error-url", required: false, many: false },
    { pageProperty: "text-property/error-user-agent", required: true, many: false },
    { pageProperty: "text-property/error-release-sha", required: false, many: false },
    { pageProperty: "instant-property/error-first-seen-at", required: true, many: false },
    {
      pageProperty: "instant-property/error-last-seen-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "number-property/error-count",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One page gathers every report sharing one fingerprint.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's slug is the app that met the error joined to the fingerprint.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fingerprint alone is no export name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The fields the first report had are the fields the commit has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How often and how recently an error was met is kept outside the commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A later report raises the count and leaves the committed body alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Filing an error again commits nothing.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A fresh checkout has no count for any error.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No stack reaches a page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nobody who met an error is named here.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A message or a url could have a secret.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here takes a secret out of the fields a report carried.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error page goes once the fault the page reports is gone.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Whether anyone has looked at an error is said nowhere here.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
