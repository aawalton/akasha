import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../pages/properties/title.text-property.ts"

export type Host = Domain & {
  title: Title
}

export const host = {
  id: "01a06590-e94f-7d6f-a415-867286e194a2",
  pageTypeSlug: "page-type",
  slug: "host",
  definition: "a place the system runs programs",
  pluralSlug: "hosts",
  extendsSlug: ["page-type/domain"],
  partSlugs: [
    "host/macbook",
    "host/node-01",
    "host/node-02",
    "host/node-03",
    "host/node-04",
    "host/node-05",
    "host/node-06",
    "host/workstation",
  ],
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a node's configuration is declared.",
    },
    {
      invariantKind: "departure",
      statement: "Every other machine is set up by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A host is a domain.",
    },
    {
      invariantKind: "departure",
      statement: "A host's definition and its title alike say what the host is.",
    },
  ],
} as const satisfies PageType
