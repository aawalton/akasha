import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const inferenceService = {
  id: "01a09099-06af-7cdb-a825-c9aaf68f155e",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "inference-service",
  definition: "a service a model runs behind, on a machine outside the cluster",
  pluralSlug: "inference-services",
  extends: ["page-type/service"],
  parts: [
    "boolean-property/warm",
    "number-property/internal-port",
    "relation-property/provision",
    "text-property/inference-host",
    "text-property/lifecycle",
    "text-property/python-version",
    "text-property/workdir",
  ],
  properties: [
    { pageProperty: "text-property/inference-host", required: true, many: false },
    { pageProperty: "relation-property/provision", required: true, many: false },
    { pageProperty: "text-property/python-version", required: true, many: false },
    { pageProperty: "text-property/workdir", required: true, many: false },
    { pageProperty: "text-property/runs", required: true, many: true, maxCount: 1 },
    { pageProperty: "boolean-property/enabled", required: true, many: false },
    { pageProperty: "number-property/port", required: true, many: false },
    { pageProperty: "number-property/internal-port", required: false, many: false },
    { pageProperty: "text-property/lifecycle", required: true, many: false },
    { pageProperty: "boolean-property/warm", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An inference service names the script that builds the environment it runs in.",
    },
    {
      invariantKind: "departure",
      statement: "The folder handed to the host is read off that script rather than spelled.",
    },
    {
      invariantKind: "departure",
      statement: "A shell on the host reads the command line an inference service runs.",
    },
    {
      invariantKind: "departure",
      statement: "A service the pool fronts is asked for at its port and listens on its own.",
    },
    {
      invariantKind: "gap",
      statement: "An inference service reaches its host through `akasha deploy` alone.",
    },
  ],
  types: "ts",
} as const satisfies PageType
