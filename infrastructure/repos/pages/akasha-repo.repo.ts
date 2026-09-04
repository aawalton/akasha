import type { Repo } from "../repo.page-type.ts"

export const akashaRepo = {
  id: "01a06975-df76-7185-a7d4-ff026aece45c",
  pageTypeSlug: "repo",
  slug: "akasha-repo",
  definition: "the repository nothing tracked is outside",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing under `.claude` is tracked here.",
    },
    {
      invariantKind: "departure",
      statement: "This repository has one master instance.",
    },
    {
      invariantKind: "departure",
      statement: "Every copy other than the master is a backup or read-only.",
    },
    {
      invariantKind: "departure",
      statement: "A type declaration is the one thing imported from another repository.",
    },
    {
      invariantKind: "gap",
      statement: "No file here imports a file in another repository.",
    },
    {
      invariantKind: "gap",
      statement: "This repository contains no unused code.",
    },
    {
      invariantKind: "gap",
      statement: "Domain logic lives in a package of its own domain.",
    },
    {
      invariantKind: "gap",
      statement: "No command that calls domain logic is named inside domain logic.",
    },
    {
      invariantKind: "gap",
      statement: "Every third-party package this repo uses is declared.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Atomic Commit",
      act: "Stage and commit in one command, naming the paths that commit is for.",
      warrant:
        "A parent's worktree is shared by every child, so anything staged and not committed is swept up.",
      aids: [
        "Never reach for `-a` to make it one command.",
        "Name the files, never a directory that may grow.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Right Version",
      act: "Check a claim about a file against the version it was made about, not the one on disk now.",
      warrant:
        "A file carries no time, so the wrong version answers as confidently as the right one.",
      aids: [
        "`git show <commit>:<path>` when numbers disagree.",
        "Treat a small unexplained gap as the file moving.",
      ],
    },
  ],
} as const satisfies Repo
