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
      statement: "A workload no container syncs code into has no build made for that workload.",
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
      invariantKind: "absence",
      statement: "Nothing here puts a commit onto origin.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a tree installs is asked of the manifests it tracks rather than of the worktree.",
    },
    {
      invariantKind: "departure",
      statement:
        "Only the manifests a tree tracks and the lockfile beside those manifests are taken out of the tree.",
    },
    {
      invariantKind: "departure",
      statement:
        "An install proved this way writes nothing into the tree the install was proved from.",
    },
    {
      invariantKind: "departure",
      statement: "A workspace a tree names and tracks no manifest for is named in the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The scratch an install is proved in is swept whether the proof passed or failed.",
    },
    {
      invariantKind: "absence",
      statement: "No whole tree is laid out to prove an install.",
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
      statement:
        "A build run leaves the sha that run was made from inside the build that run made.",
    },
    {
      invariantKind: "departure",
      statement:
        "The values a build needs are the values the manifest code exports beside the manifests.",
    },
    {
      invariantKind: "departure",
      statement: "A value a build needs that a cluster secret holds is read from that secret.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value a build needs that nothing holds stops the build before the build starts.",
    },
    {
      invariantKind: "departure",
      statement: "The sha built stands among the values the build is handed.",
    },
    {
      invariantKind: "absence",
      statement: "No value read from a secret is carried into what is reported.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a build already stands is asked of the pod holding it.",
    },
    {
      invariantKind: "departure",
      statement: "A pod already going away holds no build.",
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
      statement:
        "Every web app's build stands in a host path on the one node that serves that web app.",
    },
    {
      invariantKind: "gap",
      statement: "A build is made somewhere other than the pod that serves it.",
    },
  ],
} as const satisfies Module
