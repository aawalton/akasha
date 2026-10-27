import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const blockDiskCrawl = {
  id: "01a17fbe-b263-7035-ad25-1b6a2bb0532e",
  type: "page-type/agent-hook",
  slug: "block-disk-crawl",
  definition: "a refusal of a recursive search over the whole disk or the whole home folder",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A recursive search rooted at the disk's root or at a home folder is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The roots read as such are `/`, `/var`, `/var/home`, `/home` and the home folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`~`, `$HOME` and `${HOME}` are read as the home folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`find`, `rg`, `fd`, `du`, a recursive `grep` and a recursive `ls` are read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`locate` is refused wherever it is called, since it answers for the whole disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search rooted at any narrower folder is let through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The refusal names `akasha search`, the Glob and Grep tools, and the page the index names.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A world builder's `find /` hung a live game's seat for minutes.",
    },
  ],
  createdAt: "2026-10-27T23:42:46.370Z",
  updatedAt: "2026-10-27T23:42:46.370Z",
} as const satisfies AgentHook
