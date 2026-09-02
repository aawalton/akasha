import type { Module } from "@akasha/code-system/module"

export const asyncScheduler = {
  id: "01a0606a-1c56-794f-a1fd-a94bc5a42ecc",
  pageTypeSlug: "module",
  slug: "async-scheduler",
  definition: "how much of each frame the jobs are given and which job runs next",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The frame budget is read from the frame rate the game reports.",
    },
    {
      invariantKind: "departure",
      statement: "A console budget is read from the addon CPU time the game allows each frame.",
    },
    {
      invariantKind: "departure",
      statement: "A job raising an error is handed to the error step of that job.",
    },
    {
      invariantKind: "departure",
      statement: "A job with no error step suspends and the error is raised again.",
    },
    {
      invariantKind: "departure",
      statement: "A job marked once per frame runs no more than once in a frame.",
    },
    {
      invariantKind: "departure",
      statement: "A frame that overran is paid back out of the next frame.",
    },
  ],
} as const satisfies Module
