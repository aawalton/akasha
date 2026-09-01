import type { Module } from "@akasha/code-system/module"

export const mobileSsh = {
  id: "01a05cee-e560-740b-bd8f-abdea9c8358c",
  pageTypeSlug: "module",
  slug: "mobile-ssh",
  definition: "the ssh and rsync child processes that reach an ssh target",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A script reaches the host as a file rsynced to the host.",
    },
    {
      invariantKind: "departure",
      statement: "The local temporary directory is removed whether or not the remote run threw.",
    },
    {
      invariantKind: "departure",
      statement:
        "runSshResult answers a failing exit code rather than rejecting on the failing exit code.",
    },
    {
      invariantKind: "departure",
      statement: "Remote stderr is inherited straight to this process and never captured.",
    },
    {
      invariantKind: "departure",
      statement: "A spawn that fails with ENOENT is reported as the tool being off PATH.",
    },
  ],
} as const satisfies Module
