import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const deployJobRunning = {
  id: "01a0a102-c51d-75a9-8995-8d088708ee8d",
  type: "module",
  slug: "deploy-job-running",
  definition: "a deploy's job put on the cluster, waited on, and answered as what that job said",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A job is put up from the manifest composed for that subject and commit.",
    },
    {
      invariantKind: "departure",
      statement: "A commit origin does not carry is pushed there before the job goes up.",
    },
    {
      invariantKind: "departure",
      statement: "The secret the job reads the repository with is placed before the job goes up.",
    },
    {
      invariantKind: "departure",
      statement: "A key no secret page places refuses the run rather than leaving the job to fail.",
    },
    {
      invariantKind: "departure",
      statement: "The run waits for the job to end rather than answering while it runs.",
    },
    {
      invariantKind: "departure",
      statement: "A job that ended either way has its lines read and carried back.",
    },
    {
      invariantKind: "departure",
      statement: "A job that failed refuses the run, and the lines still come back.",
    },
    {
      invariantKind: "departure",
      statement: "A job left running past the wait refuses the run rather than being taken away.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here composes the job.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes what the deploy learned.",
    },
    {
      invariantKind: "departure",
      statement: "The commit the subject was last deployed at is read before the job is composed.",
    },
  ],
} as const satisfies Module
