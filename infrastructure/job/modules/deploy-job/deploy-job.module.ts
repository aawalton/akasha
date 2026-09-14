import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const deployJob = {
  id: "01a0a0f6-5662-7252-90e8-ea20b000453f",
  type: "module",
  slug: "deploy-job",
  definition: "the job a deploy runs as, checked out in the cluster at the commit it is made at",
  code: "ts",
  test: "ts",
  allowsTmpPaths: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A deploy that runs in the cluster runs as a job of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A job is named for the subject deployed and the commit it is made at.",
    },
    {
      invariantKind: "departure",
      statement: "A job takes the repository from the git service inside the cluster.",
    },
    {
      invariantKind: "departure",
      statement: "The token a job reads the repository with is handed in from a secret.",
    },
    {
      invariantKind: "absence",
      statement: "No token is written into the job the cluster is handed.",
    },
    {
      invariantKind: "departure",
      statement: "A job fetches the one commit rather than the whole history.",
    },
    {
      invariantKind: "departure",
      statement: "A job builds the part of the index git does not carry before it reads a page.",
    },
    {
      invariantKind: "departure",
      statement: "A job builds the index by running a file rather than by calling a command.",
    },
    {
      invariantKind: "departure",
      statement: "A job runs in the image a pipeline's own steps run in.",
    },
    {
      invariantKind: "departure",
      statement: "A job runs on a node of the class that carries this work.",
    },
    {
      invariantKind: "departure",
      statement: "A job that failed is not run again by the cluster.",
    },
    {
      invariantKind: "departure",
      statement: "The memory a landing starts on is read from the pod rather than the workstation.",
    },
    {
      invariantKind: "departure",
      statement: "The command the job runs is asked of the index rather than spelled.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here applies the job to the cluster.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the workstation's checkout.",
    },
    { invariantKind: "departure", statement: "A job runs under no syscall filter." },
  ],
} as const satisfies Module
