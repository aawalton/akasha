import type { ShellScript } from "../../shell-script.page-type.ts"

export const reposEmptyDirPurge = {
  id: "01a06561-3c4d-7a18-b072-9e4c1d8f2a35",
  pageTypeSlug: "shell-script",
  slug: "repos-empty-dir-purge",
  definition: "the empty directories under the repos folder taken away",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every empty directory under the repos folder is taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A directory under a git folder or under a node_modules folder is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A pages folder one level under a repository is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "Taking a directory away may empty the directory above.",
    },
    {
      invariantKind: "departure",
      statement: "The sweep runs again until nothing goes.",
    },
    {
      invariantKind: "departure",
      statement: "The sweep runs twenty times at most however many directories are left.",
    },
    {
      invariantKind: "departure",
      statement: "A directory that will not go is passed over rather than failing the run.",
    },
    {
      invariantKind: "departure",
      statement: "The repos folder is named by the environment or taken to be the one under home.",
    },
    {
      invariantKind: "departure",
      statement: "How many directories went is said on one line.",
    },
  ],
} as const satisfies ShellScript
