import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const webAppBuilding = {
  id: "01a05b27-a75c-7fab-a630-6d98b13144e1",
  type: "module",
  slug: "web-app-building",
  definition: "the build a web app's pod serves, made in that pod from what a workstation holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The package built is the package a container's working directory names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A workload no container syncs code into has no build made for that workload.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A plan naming no workload names nothing for a pod to build.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The sha built is the sha the caller names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether origin has a sha is asked of origin rather than of a local ref.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here puts a commit onto origin.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Whether a tree installs is asked of the manifests that tree tracks rather than of the worktree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Only the manifests a tree tracks and the lockfile beside those manifests are taken out of the tree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An install proved this way writes nothing into the tree the install was proved from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A workspace a tree names and tracks no manifest for is named in the refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The scratch an install is proved in is swept whether the proof passed or failed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No whole tree is laid out to prove an install.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pod is checked out to the sha before the build runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A checkout failing for a reason that passes is tried again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The workload is restarted onto the build and waited on until its rollout is done.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A build restarts the workload only where no apply is about to roll that workload.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A build run leaves the sha that run was made from inside the build that run made.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The builder is run from the checkout rather than through a script in the folder built.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build is written into a scratch beside the folder the pod serves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder the pod serves is replaced only once a build is made whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build that fails leaves the folder the pod serves as that folder was.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The scratch a build failed in is swept before the next build begins.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The values a build needs are the values the manifest code exports beside the manifests.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value a build needs that a cluster secret has is read from that secret.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value a build needs that nothing has stops the build before the build starts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The sha built is among the values the build is handed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No value read from a secret is carried into the text reported.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal reports the last lines said with every stack frame dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A failure saying nothing but stack frames is reported by those frames.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a build already exists is asked of the pod holding the build.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pod already going away has no build.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here applies a manifest.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement:
        "Every web app's build sits in a host path on the one node that serves that web app.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A build is made somewhere other than the pod that serves that build.",
    },
  ],
} as const satisfies Module
