import type { Command } from "../command.page-type.ts"

export const test = {
  id: "01a04ea6-15a3-7000-830d-4cdb1779e81f",
  pageTypeSlug: "command",
  slug: "test",
  definition: "the command running the akasha tests and saying whether they passed",
  code: "ts",
  test: "ts",
  taking: [
    { said: "--file-path <path>", takes: "a file or folder under `akasha/` whose tests run" },
  ],
  helpNotes: [
    "--file-path repeats, so several paths run in one call.",
    "named nothing, it runs every test under `akasha/`.",
    "a run takes no filter for which tests inside a file run.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run reaches no test outside the akasha folder.",
    },
    {
      invariantKind: "departure",
      statement: "A run named nothing runs every test under the akasha folder.",
    },
    {
      invariantKind: "departure",
      statement: "The verdict is read from what the run printed, not from its exit code alone.",
    },
    {
      invariantKind: "departure",
      statement: "A run reaching fewer files than stand under it has failed, not passed.",
    },
    {
      invariantKind: "absence",
      statement: "A run takes no filter for which tests inside a file run.",
    },
  ],
} as const satisfies Command
