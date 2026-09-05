import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { ProxyPort } from "./proxy-port.number-property.ts"
import type { ProxyProcess } from "./proxy-process.process-property.ts"
import type { ProxyVersion } from "./proxy-version.text-property.ts"

export type Proxy = { process: ProxyProcess; port: ProxyPort; version: ProxyVersion }

export const proxy = {
  id: "01a0540c-dbbf-7215-9747-624c4ef37e06",
  pageTypeSlug: "record-property",
  slug: "proxy",
  propertySlug: "proxy",
  definition: "the proxy a seat reaches its model through",
  properties: [
    { pagePropertySlug: "proxy-process", required: true, many: false },
    { pagePropertySlug: "proxy-port", required: true, many: false },
    { pagePropertySlug: "proxy-version", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat reaches one proxy or no proxy.",
    },
    {
      invariantKind: "departure",
      statement: "A proxy short of any of these fields is no proxy at all.",
    },
  ],
} as const satisfies RecordProperty
