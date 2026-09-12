import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const service = {
  id: "01a05a3c-caff-7656-b00d-cbde9f3cf324",
  type: "page-type",
  slug: "service",
  definition: "a thing a deploy puts up",
  pluralSlug: "services",
  extends: ["page-type/domain"],
  parts: [
    "instant-property/deploy-ended-at",
    "instant-property/deploy-refused-at",
    "number-property/cooldown-seconds",
    "relation-property/deploys-after",
    "text-property/deployed-commit",
    "text-property/refused-commit",
  ],
  properties: [
    {
      pageProperty: "text-property/deployed-commit",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "text-property/refused-commit",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pageProperty: "number-property/cooldown-seconds", required: false, many: false },
    {
      pageProperty: "relation-property/deploys-after",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "instant-property/deploy-ended-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "instant-property/deploy-refused-at",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service is put up by a deploy rather than by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A service a runner keeps up is named `service` and then that runner.",
    },
    {
      invariantKind: "departure",
      statement: "A service a runner keeps up is started by that runner rather than by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A service a runner keeps up states the program that service runs.",
    },
    {
      invariantKind: "departure",
      statement: "A service a runner keeps up states whether that service is to be running.",
    },
    {
      invariantKind: "departure",
      statement: "A service carries the commit the last deploy that finished put up.",
    },
    {
      invariantKind: "departure",
      statement: "A service carries what each deploy of that service cost.",
    },
  ],
  types: "ts",
} as const satisfies PageType
