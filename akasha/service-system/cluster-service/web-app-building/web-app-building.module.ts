import type { Module } from "@akasha/code-system/module"

export const webAppBuilding = {
  id: "01a05b27-a75c-7fab-a630-6d98b13144e1",
  pageTypeSlug: "module",
  slug: "web-app-building",
  definition: "the build a web app's pod serves, made in that pod from what a workstation holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The package built is the one a container's working directory names.",
    },
    {
      invariantKind: "departure",
      statement: "A workload no container syncs code into has no build made for it.",
    },
    {
      invariantKind: "departure",
      statement: "The sha built is the one the workstation's HEAD stands at.",
    },
    {
      invariantKind: "departure",
      statement: "A sha carrying anything other than forty hexadecimal digits is no sha.",
    },
    {
      invariantKind: "departure",
      statement: "Whether origin carries a sha is asked of origin rather than of a local ref.",
    },
    {
      invariantKind: "departure",
      statement: "A sha origin does not carry is pushed onto origin's main before it is built.",
    },
    {
      invariantKind: "departure",
      statement: "A push origin refuses is never forced.",
    },
    {
      invariantKind: "departure",
      statement: "The pod is checked out to the sha before the build runs.",
    },
    {
      invariantKind: "departure",
      statement: "A checkout failing for a reason that passes is tried again.",
    },
    {
      invariantKind: "departure",
      statement:
        "The workload is restarted onto the build and waited on until its rollout is done.",
    },
    {
      invariantKind: "departure",
      statement: "A build leaves the sha it was made from inside the build it made.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a build already stands is asked of the pod holding it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here applies a manifest.",
    },
    {
      invariantKind: "stopgap",
      statement: "Every web app's build stands in a host path on the one node that serves it.",
    },
    {
      invariantKind: "gap",
      statement: "A build is made somewhere other than the pod that serves it.",
    },
  ],
} as const satisfies Module
