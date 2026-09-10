import type { CodeCheck } from "../../code-check.page-type.types.ts"

export const commandIsInTheRightFolder = {
  id: "01a08d69-0b2e-7025-abd3-c4abe10799be",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "command-is-in-the-right-folder",
  definition:
    "the check refusing a command or a namespace whose folder is not the one its parts name",
  runsOnChange: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
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
      invariantKind: "absence",
      statement: "A module sitting beside a command is judged by nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "No page type is named here beyond the two this tree is built from.",
    },
    {
      invariantKind: "gap",
      statement: "This check judges at audit and does not yet judge a change as that change lands.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
  experimental: true,
} as const satisfies CodeCheck
