import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const commandIsNamedByItsPlaceInTheTree = {
  id: "01a08d69-0b2e-7025-abd3-c4abe10799be",
  type: "code-check",
  slug: "command-is-named-by-its-place-in-the-tree",
  definition:
    "the check refusing a command or a namespace misplaced or misnamed in the command tree",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnWorktree: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The command tree and the folder tree under `commands/` are one tree said twice.",
    },
    {
      invariantKind: "departure",
      statement: "A command and a namespace are judged here rather than every page under a domain.",
    },
    {
      invariantKind: "departure",
      statement: "The page above one judged is the page naming it among its parts.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page the `command` page type names sits in a folder directly in `commands/pages/`.",
    },
    {
      invariantKind: "departure",
      statement: "Any other page judged sits in a folder directly inside its parent's own folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder is named for what its page's slug adds to the parent's slug.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose slug opens with anything but its parent's slug is refused for that.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command's slug is its path under `commands/pages` with a hyphen for each slash.",
    },
    {
      invariantKind: "departure",
      statement: "A level's own name is the folder that level sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A level of the command tree names itself with no name of a level above it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command or a namespace is named among the parts of a namespace or of the `command` page type.",
    },
    {
      invariantKind: "gap",
      statement: "A namespace holds more than one command or namespace.",
    },
    {
      invariantKind: "absence",
      statement: "A module sitting beside a command is judged by nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "No page type is named here beyond the two this tree is built from.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CodeCheck
