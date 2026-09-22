import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const imageInputs = {
  id: "01a08da2-9e44-7155-8ecf-d7ded3c83ef1",
  type: "page-type/module",
  slug: "image-inputs",
  definition: "what a built image is built from, and the hash naming those inputs",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The inputs are what the Dockerfile copies out of the context.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The inputs are read at a commit rather than off the working files of the folder handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder stamped with the commit it is pinned at is read at that commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder with no commit stamped on it is read at its own head.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path a second stage copies is no input, because an earlier stage made it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A copied path is named from the root rather than from the folder the build is handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image copying nothing out of the context is hashed on its Dockerfile alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such an image drifts from the commit HEAD is at in nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder written out at a commit holds that commit, so nothing in it drifts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a folder is told from a checkout by git calling it no work tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Git refuses to answer drift outside a work tree, so drift is asked only of a checkout.",
    },
  ],
} as const satisfies Module
