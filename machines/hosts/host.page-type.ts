import type { PageType } from "@akasha/pages/page-type"
import type { Domain } from "akasha/domains/domain.page-type.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { HostAddress } from "./properties/host-address.text-property.ts"
import type { LoginUser } from "./properties/login-user.text-property.ts"

export type Host = Domain & {
  title: Title
  address?: HostAddress
  loginUser?: LoginUser
}

export const host = {
  id: "01a06590-e94f-7d6f-a415-867286e194a2",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "host",
  definition: "a place the system runs programs",
  pluralSlug: "hosts",
  extends: ["page-type/domain"],
  parts: [
    "host/macbook",
    "host/node-01",
    "host/node-02",
    "host/node-03",
    "host/node-04",
    "host/node-05",
    "host/node-06",
    "host/workstation",
    "module/cluster-nodes",
    "text-property/host-address",
    "text-property/login-user",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/host-address", required: false, many: false },
    { pageProperty: "text-property/login-user", required: false, many: false },
  ],
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
      statement: "A host's definition and its title alike name the host.",
    },
    {
      invariantKind: "departure",
      statement: "A host reached over the network states the address that host answers at.",
    },
    {
      invariantKind: "departure",
      statement: "A host a script signs in to states the account that script signs in as.",
    },
  ],
} as const satisfies PageType
