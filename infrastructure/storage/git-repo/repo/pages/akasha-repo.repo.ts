import type { Repo } from "akasha/infrastructure/storage/git-repo/repo/repo.page-type.types.ts"

export const akashaRepo = {
  id: "01a06975-df76-7185-a7d4-ff026aece45c",
  type: "page-type/repo",
  slug: "akasha-repo",
  definition: "the repository nothing tracked is outside",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing under `.claude` is tracked here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This repository has one master instance.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every copy other than the master is a backup or read-only.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type declaration is the one thing imported from another repository.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "No file here imports a file in another repository.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "This repository contains no unused code.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Domain logic lives in a package of its own domain.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "No command that calls domain logic is named inside domain logic.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Every third-party package this repo uses is declared.",
    },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "Right Version",
      act: "Check a claim about a file against the version it was made about, not the one on disk now.",
      warrant: "A file has no time, so the wrong version answers as confidently as the right one.",
      aids: [
        "`git show <commit>:<path>` when numbers disagree.",
        "Treat a small unexplained gap as the file moving.",
      ],
    },
  ],
} as const satisfies Repo
