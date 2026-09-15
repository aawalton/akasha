import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const service = {
  id: "01a05a3c-caff-7656-b00d-cbde9f3cf324",
  type: "page-type",
  slug: "service",
  definition: "a thing a deploy puts up",
  extends: ["page-type/domain"],
  parts: [
    "instant-property/deploy-ended-at",
    "instant-property/deploy-refused-at",
    "module/deploy-choosing",
    "module/deploy-looping",
    "module/deploy-subject-listing",
    "module/deploy-wanting",
    "number-property/cooldown-seconds",
    "page-type/secret",
    "page-type/service-cluster",
    "page-type/service-inference",
    "page-type/service-workstation",
    "page-type/vendored-workload",
    "page-type/web-app",
    "relation-property/deploys-after",
    "service-workstation/cluster-deploying",
    "service-workstation/container-recipe-deploying",
    "service-workstation/eso-addon-deploying",
    "service-workstation/inference-deploying",
    "service-workstation/ios-app-deploying",
    "service-workstation/service-watching",
    "service-workstation/web-app-deploying",
    "service-workstation/workstation-deploying",
    "text-property/deployed-commit",
    "text-property/refused-commit",
  ],
  properties: [
    {
      pageProperty: "text-property/deployed-commit",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "text-property/refused-commit",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pageProperty: "number-property/cooldown-seconds", required: false, many: false },
    {
      pageProperty: "relation-property/deploys-after",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "instant-property/deploy-ended-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "instant-property/deploy-refused-at",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service is put up by a deploy rather than by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A service a runner keeps up is named `service` and then that runner.",
    },
    {
      invariantKind: "departure",
      statement: "A service a runner keeps up is started by that runner rather than by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A service a runner keeps up states the program that service runs.",
    },
    {
      invariantKind: "departure",
      statement: "A service a runner keeps up states whether that service is to be running.",
    },
    {
      invariantKind: "departure",
      statement: "A service carries the commit the last deploy that finished put up.",
    },
    {
      invariantKind: "departure",
      statement: "A service carries what each deploy of that service cost.",
    },
    {
      invariantKind: "departure",
      statement: "The three services a runner keeps up sit in folders beside each other here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service is deployed without anyone asking once a commit changes what it is built from.",
    },
  ],
  types: "ts",
} as const satisfies PageType
