import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const mobileSsh = {
  id: "01a05cee-e560-740b-bd8f-abdea9c8358c",
  type: "module",
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
      statement: "A value the script must not carry is sent by name through the ssh environment.",
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
      statement: "Remote stderr is inherited straight to this process.",
    },
    {
      invariantKind: "departure",
      statement: "A caller asking to be quiet is given that stderr among the run's own output.",
    },
    {
      invariantKind: "departure",
      statement: "A quiet rsync says nothing on either stream.",
    },
    {
      invariantKind: "departure",
      statement: "A directory reaches the host whole and a named file reaches the host alone.",
    },
    {
      invariantKind: "departure",
      statement: "Named files reach the host under the paths those files have below the root.",
    },
    {
      invariantKind: "absence",
      statement: "A delivery of named files deletes nothing already on the host.",
    },
    {
      invariantKind: "departure",
      statement: "A spawn that fails with ENOENT is reported as the tool being off PATH.",
    },
  ],
} as const satisfies Module
