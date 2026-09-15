import type { Module } from "akasha/code/module/module.page-type.types.ts"

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
      invariantKind: "invariant-kind/departure",
      statement: "A deploy that runs in the cluster runs as a job of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A job is named for the subject deployed and the commit it is made at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A job takes the repository from the git service inside the cluster.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The token a job reads the repository with is handed in from a secret.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key a job decrypts a secret with is handed in from a secret.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No token is written into the job the cluster is handed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A job fetches the commit it is made at rather than the whole history.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A job builds no index, git carrying every index a page is read through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A job runs in the image a pipeline's own steps run in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A job runs on a node of the class that carries this work.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A job that failed is not run again by the cluster.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The deploy a job carries runs under no ceiling of the command's own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A job bounds the deploy it carries, and nothing inside that deploy does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The memory a landing starts on is read from the pod rather than the workstation.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The command the job runs is asked of the index rather than spelled.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here applies the job to the cluster.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the workstation's checkout.",
    },
    { invariantKind: "invariant-kind/departure", statement: "A job runs under no syscall filter." },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The overlay a job's test gate mounts is held on a volume of the job's own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A job states that the run it carries is the one in the cluster.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A job fetches the commit its subject was last deployed at beside the commit it is made at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A job whose subject was never deployed fetches one commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A last deployed commit origin no longer carries leaves the rest of the job running.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A job holds every privilege the node gives a container.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A job makes control groups of its own under the one it runs in.",
    },
  ],
} as const satisfies Module
