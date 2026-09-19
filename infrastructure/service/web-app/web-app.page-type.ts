import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const webApp = {
  id: "01a05b26-f8b6-7d74-a301-0488daed8bbc",
  type: "page-type/page-type",
  slug: "web-app",
  definition: "a site built from one folder of this repository and served over the web",
  extends: ["page-type/service"],
  parts: [
    "module/dev-server-env-writing",
    "module/dev-server-recording",
    "module/dev-server-stating",
    "module/dev-server-tree",
    "number-property/base-port",
    "relation-property/service-clusters",
    "text-property/build-command",
    "text-property/hostnames",
    "text-property/secret-resource",
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
      pageProperty: "relation-property/service-clusters",
      required: true,
      many: true,
      maxCount: 20,
    },
    { pageProperty: "text-property/hostnames", required: false, many: true, maxCount: 20 },
    { pageProperty: "text-property/secret-resource", required: true, many: false },
    { pageProperty: "number-property/base-port", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app's page states everything a deploy of the web app needs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The workload the cluster runs for a web app is stated on the cluster service's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app is named by the slug its page carries.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A web app states nothing of the build representing the web app now.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The tunnel is routed from the host names stated here.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
