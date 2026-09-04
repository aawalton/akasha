import type { Module } from "@akasha/code-system/module"

export const pushTapScript = {
  id: "01a05cee-e560-71d2-95a2-e4f789ace504",
  pageTypeSlug: "module",
  slug: "push-tap-script",
  definition: "the shell that pushes an APNs payload to a booted simulator",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "simctl push routes by the Simulator Target Bundle key inside the payload.",
    },
    {
      invariantKind: "departure",
      statement: "The payload crosses to the host base64-encoded rather than as literal JSON.",
    },
    {
      invariantKind: "departure",
      statement: "The decoded payload lands at /var/tmp/ops-sim-push-tap.apns on the host.",
    },
    {
      invariantKind: "constraint",
      statement: "The deep-link route rides outside `aps` at the payload's top level.",
    },
    {
      invariantKind: "departure",
      statement: "A cold push exits with status 3 when the app is found still running.",
    },
  ],
} as const satisfies Module
