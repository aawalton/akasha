import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const serviceInference = {
  id: "01a09099-06af-7cdb-a825-c9aaf68f155e",
  type: "page-type/page-type",
  slug: "service-inference",
  definition: "a service a model runs behind, on a machine outside the cluster",
  pluralSlug: "service-inferences",
  extends: ["page-type/service"],
  parts: [
    "boolean-property/warm",
    "module/inference-reading",
    "number-property/internal-port",
    "page-type/service-lifecycle",
    "relation-property/provision",
    "relation-property/inference-host",
    "relation-property/lifecycle",
    "text-property/python-version",
    "text-property/runs",
    "text-property/workdir",
  ],
  properties: [
    { pageProperty: "relation-property/inference-host", required: true, many: false },
    { pageProperty: "relation-property/provision", required: true, many: false },
    { pageProperty: "text-property/python-version", required: true, many: false },
    { pageProperty: "text-property/workdir", required: true, many: false },
    { pageProperty: "text-property/runs", required: true, many: true, maxCount: 1 },
    { pageProperty: "boolean-property/enabled", required: true, many: false },
    { pageProperty: "number-property/port", required: true, many: false },
    { pageProperty: "number-property/internal-port", required: false, many: false },
    { pageProperty: "relation-property/lifecycle", required: true, many: false },
    { pageProperty: "boolean-property/warm", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An inference service names the script that builds the environment it runs in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder handed to the host is read off that script rather than spelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shell on the host reads the command line an inference service runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service the pool fronts is asked for at its port and listens on its own.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "An inference service reaches its host through `akasha deploy` alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pool service states an internal port and an always-on service states none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A warm service is a pool service.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
