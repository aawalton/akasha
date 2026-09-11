import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const service = {
  id: "01a05a3c-caff-7656-b00d-cbde9f3cf324",
  type: "page-type",
  slug: "service",
  definition: "a thing a deploy puts up",
  pluralSlug: "services",
  extends: ["page-type/domain"],
  parts: ["text-property/deployed-commit"],
  properties: [
    {
      pageProperty: "text-property/deployed-commit",
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
  ],
  types: "ts",
} as const satisfies PageType
