import type { PageType } from "@akasha/pages-system/page-type"
import type { Service } from "../services/service.page-type.ts"
import type { Binds } from "./properties/binds.text-property.ts"
import type { Enabled } from "./properties/enabled.boolean-property.ts"
import type { NeedsSecrets } from "./properties/needs-secrets.boolean-property.ts"
import type { Port } from "./properties/port.number-property.ts"
import type { Runs } from "./properties/runs.text-property.ts"
import type { Systemd } from "./properties/systemd.record-property.ts"

export type WorkstationService = Service & {
  runs: readonly Runs[]
  enabled: Enabled
  systemd?: Systemd
  needsSecrets?: NeedsSecrets
  port?: Port
  binds?: readonly Binds[]
}

export const workstationService = {
  id: "01a05a3f-b42a-754e-af3c-8b30ed9d6ad1",
  pageTypeSlug: "page-type",
  slug: "workstation-service",
  definition: "a service the workstation runs",
  pluralSlug: "workstation-services",
  extendsSlug: "page-type/service",
  partSlugs: [
    "boolean-property/catch-up",
    "boolean-property/enabled",
    "boolean-property/needs-secrets",
    "number-property/accuracy-seconds",
    "number-property/boot-delay-seconds",
    "number-property/interval-seconds",
    "number-property/jitter-seconds",
    "number-property/nice",
    "number-property/port",
    "number-property/restart-delay-seconds",
    "number-property/restart-force-exit-status",
    "number-property/start-limit-interval-seconds",
    "number-property/start-timeout-seconds",
    "number-property/stop-timeout-seconds",
    "number-property/success-exit-status",
    "record-property/systemd",
    "select-property/kill-mode",
    "text-property/after",
    "text-property/binds",
    "text-property/part-of",
    "select-property/restart",
    "text-property/runs",
    "text-property/schedule",
    "text-property/stops",
    "text-property/wanted-by",
    "text-property/wants",
  ],
  properties: [
    { pagePropertySlug: "runs", required: true, many: true, max: null },
    { pagePropertySlug: "enabled", required: true, many: false },
    { pagePropertySlug: "systemd", required: false, many: false },
    { pagePropertySlug: "needs-secrets", required: false, many: false },
    { pagePropertySlug: "port", required: false, many: false },
    { pagePropertySlug: "binds", required: false, many: true, max: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A workstation service runs the code as the code stands in the repository.",
    },
    {
      invariantKind: "departure",
      statement: "A workstation service runs under one wrapper.",
    },
    {
      invariantKind: "departure",
      statement: "The wrapper starts the service again when a file the service reaches changes.",
    },
    {
      invariantKind: "departure",
      statement: "A service's own imports settle which files start the service again.",
    },
    {
      invariantKind: "departure",
      statement: "An import reaching outside this repository starts nothing again.",
    },
    {
      invariantKind: "departure",
      statement: "A workstation service is started and stopped from its page alone.",
    },
    {
      invariantKind: "gap",
      statement: "Every workstation service runs under systemd.",
    },
  ],
} as const satisfies PageType
