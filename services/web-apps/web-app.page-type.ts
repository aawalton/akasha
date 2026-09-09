import type { PageType } from "@akasha/pages/page-type"
import type { Domain } from "akasha/domains/domain.page-type.ts"
import type { BuildCommand } from "./properties/build-command.text-property.ts"
import type { ClusterServices } from "./properties/cluster-services.relation-property.ts"
import type { Hostnames } from "./properties/hostnames.text-property.ts"
import type { SourceDirectory } from "./properties/source-directory.text-property.ts"

export type WebApp = Domain & {
  sourceDirectory: SourceDirectory
  buildCommand: BuildCommand
  clusterServices: ClusterServices
  hostnames?: readonly Hostnames[]
}

export const webApp = {
  id: "01a05b26-f8b6-7d74-a301-0488daed8bbc",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "web-app",
  definition: "a site built from one folder of this repository and served over the web",
  pluralSlug: "web-apps",
  extends: ["page-type/domain"],
  parts: [
    "module/change-branch-worktree",
    "module/dev-server-env-writing",
    "module/dev-server-recording",
    "module/dev-server-stating",
    "module/dev-server-worktree",
    "relation-property/cluster-services",
    "text-property/build-command",
    "text-property/hostnames",
    "text-property/source-directory",
    "web-app/alanwalton-atlas-web",
    "web-app/alanwalton-web",
    "web-app/archive-of-worlds-web",
    "web-app/audhdalan-web",
    "web-app/smilingjenny-web",
    "web-app/temper-web",
  ],
  properties: [
    { pageProperty: "text-property/source-directory", required: true, many: false },
    { pageProperty: "text-property/build-command", required: true, many: false },
    {
      pageProperty: "relation-property/cluster-services",
      required: true,
      many: true,
      maxCount: 20,
    },
    { pageProperty: "text-property/hostnames", required: false, many: true, maxCount: 20 },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A web app's page states everything a deploy of the web app needs.",
    },
    {
      invariantKind: "departure",
      statement:
        "The workload the cluster runs for a web app is stated on the cluster service's page.",
    },
    {
      invariantKind: "departure",
      statement: "A web app is named by the slug its page carries.",
    },
    {
      invariantKind: "absence",
      statement: "A web app states nothing of the build representing the web app now.",
    },
    {
      invariantKind: "gap",
      statement: "The tunnel is routed from the host names stated here.",
    },
  ],
} as const satisfies PageType
