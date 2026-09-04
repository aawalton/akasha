import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../pages/pages/properties/title.text-property.ts"
import type { Settled } from "./properties/settled.boolean-property.ts"

export type Host = Domain & {
  title: Title
  settled?: Settled
}

export const host = {
  id: "01a06590-e94f-7d6f-a415-867286e194a2",
  pageTypeSlug: "page-type",
  slug: "host",
  definition: "a place the system runs programs",
  pluralSlug: "hosts",
  extendsSlug: "page-type/domain",
  partSlugs: [
    "boolean-property/settled",
    "host/macbook",
    "host/node-01",
    "host/node-02",
    "host/node-03",
    "host/node-04",
    "host/node-05",
    "host/node-06",
    "host/workstation",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "settled", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a node's configuration is declared; every other machine is set up by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A host is a domain, so what it is stands in its definition as well as its title.",
    },
  ],
} as const satisfies PageType
