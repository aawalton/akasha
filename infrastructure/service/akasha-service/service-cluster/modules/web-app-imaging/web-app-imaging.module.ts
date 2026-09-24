import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const webAppImaging = {
  id: "01a0d5b4-6d29-7338-92c6-5f8802888961",
  type: "page-type/module",
  slug: "web-app-imaging",
  definition: "the image a web app's pod runs, built by the cluster's builder from one commit",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A workload running an image the web app repository holds is built into that image.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The package built is the package the running container's working directory names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app's image is tagged with the commit that image is built from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tag is short enough for the registry's retention to prune.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image is built by the cluster's builder from the tree the commit tracks.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No file the commit does not track reaches an image.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An image installs from the manifests the commit tracks before the rest of the tree is copied in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An install is made again only where a manifest or the lockfile changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An image lays the tree out where a pod's checkout sat, so the server reads the same paths.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image leaves the sha it was made from inside the build it made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value a build needs is handed to the builder by its name alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The builder reads that value from the environment of the process asking it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No value a build needs is written into a file, a recipe or an image's history.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No value read from a secret is carried into the text reported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scratch an image is built from is swept whether the build passed or failed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here applies a manifest.",
    },
  ],
} as const satisfies Module
