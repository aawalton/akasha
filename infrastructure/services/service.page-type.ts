import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const service = {
  id: "01a05a3c-caff-7656-b00d-cbde9f3cf324",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "service",
  definition: "a program the system runs on its own",
  pluralSlug: "services",
  extends: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service is started by its runner rather than by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A service's runner settles which kind of service that service is.",
    },
    {
      invariantKind: "departure",
      statement: "A service states the program the service runs.",
    },
    {
      invariantKind: "departure",
      statement: "A service states whether that service is to be running.",
    },
    {
      invariantKind: "absence",
      statement: "This page type adds no property of its own.",
    },
  ],
  types: "ts",
} as const satisfies PageType
