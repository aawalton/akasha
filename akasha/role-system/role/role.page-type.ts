import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { OnCall } from "../../seat-system/seat/properties/on-call.boolean-property.ts"

export type Role = Domain & {
  onCall: OnCall
}

export const role = {
  id: "01a053b2-2c20-7e34-9306-65f44016381a",
  pageTypeSlug: "page-type",
  slug: "role",
  definition: "the work an agent is answerable for",
  pluralSlug: "roles",
  extendsSlug: "page-type/domain",
  properties: [{ pagePropertySlug: "on-call", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat started with an on-call role starts on call.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "This states only what a role takes from a domain, so the old role stands until every property is reviewed and moved.",
    },
  ],
} as const satisfies PageType
