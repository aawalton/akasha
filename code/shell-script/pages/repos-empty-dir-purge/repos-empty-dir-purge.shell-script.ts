import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const reposEmptyDirPurge = {
  id: "01a06561-3c4d-7a18-b072-9e4c1d8f2a35",
  type: "page-type/shell-script",
  slug: "repos-empty-dir-purge",
  definition: "the empty directories under the repos folder taken away",
  shell: "sh",
  sourced: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every empty directory under the repos folder is taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A directory under a git folder or under a node_modules folder is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pages folder one level under a repository is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A repository's index is passed over, holding nothing being how an index reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Taking a directory away may empty the directory above.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sweep runs again until nothing goes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sweep runs twenty times at most however many directories are left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A directory that will not go is passed over rather than failing the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The repos folder is named by the environment or taken to be the one under home.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How many directories went is said on one line.",
    },
  ],
} as const satisfies ShellScript
