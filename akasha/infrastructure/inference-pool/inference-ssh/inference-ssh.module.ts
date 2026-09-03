import type { Module } from "@akasha/code-system/module"

export const inferenceSsh = {
  id: "01a0685d-4b35-700a-9f89-da8520e5f3a8",
  pageTypeSlug: "module",
  slug: "inference-ssh",
  definition: "running a script, copying a file and syncing a directory onto an inference host",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A script reaches the host on standard input rather than as an argument.",
    },
    {
      invariantKind: "departure",
      statement: "A directory is synced as one stream rather than file by file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A missing ssh or scp on the path is raised as an operational failure rather than a crash.",
    },
  ],
} as const satisfies Module
