import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pushTapScript = {
  id: "01a05cee-e560-71d2-95a2-e4f789ace504",
  type: "module",
  slug: "push-tap-script",
  definition: "the shell that pushes an APNs payload to a booted simulator",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "simctl push routes by the Simulator Target Bundle key inside the payload.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The payload crosses to the host base64-encoded rather than as literal JSON.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The decoded payload lands at /var/tmp/ops-sim-push-tap.apns on the host.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The deep-link route rides outside `aps` at the payload's top level.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cold push exits with status 3 when the app is found still running.",
    },
  ],
} as const satisfies Module
