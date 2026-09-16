import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const clusterRunning = {
  id: "01a0aabf-f39f-7e07-9230-1008e8f32320",
  type: "page-type/module",
  slug: "cluster-running",
  definition: "a job put on the cluster at a commit, waited on, and answered as what it said",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  allowsTmpPaths: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every job this system runs goes up the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit origin does not carry is pushed there before the job goes up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit origin still does not carry after the push refuses the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit that reaches origin nowhere puts no job up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The secrets the job reads are placed before the job goes up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key no secret page places refuses the run rather than leaving the job to fail.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job is put up by reading its manifest off standard input.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The run waits for the job to end rather than answering while it runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job that failed is seen on the round it failed rather than after the wait.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How many rounds a job is waited is the caller's to say.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job that ended either way has every line it said read and carried back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job that failed refuses the run, and the lines still come back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job left running past the wait refuses the run rather than being taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every job runs in the namespace named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every job is composed here from the name and the script it is handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job takes the repository from the git service inside the cluster.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The token a job reads the repository with is handed in from a secret.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key a job decrypts a secret with is handed in from a secret.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No token is written into the job the cluster is handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job fetches the commit it is made at rather than the whole history.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job fetches an earlier commit it is handed beside the commit it is made at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job handed no earlier commit fetches one commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An earlier commit origin no longer carries leaves the rest of the job running.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A job builds no index, git carrying every index a page is read through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job runs in the image a pipeline's own steps run in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job runs on a node of the class that carries this work.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job that failed is not run again by the cluster.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job bounds what that job carries, and nothing inside it does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The memory a landing starts on is read from the pod rather than the workstation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job runs under no syscall filter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The overlay a job's test gate mounts is held on a volume of the job's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job states that the run it carries is the one in the cluster.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A job holds every privilege the node gives a container.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job makes control groups of its own under the one it runs in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says what a job does once that job has checked the commit out.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads what a job's lines mean.",
    },
  ],
} as const satisfies Module
