import type { Command } from "../command.page-type.ts"

export const write = {
  id: "01a04beb-8a78-7a92-89a8-7ff777fb51ff",
  pageTypeSlug: "command",
  slug: "write",
  definition: "whole file bodies carried in, gated together and landed or refused as one",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: [],
  design: [
    "A body reaches this only as a file named at `--content-file`, so no body is carried on the command line.",
    "A path outside the akasha folder is refused, because nothing outside it is what these checks address.",
    "The bodies written and the paths taken away by one call are one gated commit, or none.",
    "`--dry-run` gates and reports and writes nothing at all, not a file and not a loose object.",
    "Breaking the glass runs no check, and says in the commit itself that none ran and why.",
    "`--dry-run` and `--break-the-glass` together are refused, because one reports what the checks say and the other runs none.",
  ],
  intent: ["A caller hands in whole bodies and learns whether they were taken, never half-taken."],
} as const satisfies Command
