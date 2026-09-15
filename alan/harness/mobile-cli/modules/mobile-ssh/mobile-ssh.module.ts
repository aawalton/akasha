import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mobileSsh = {
  id: "01a05cee-e560-740b-bd8f-abdea9c8358c",
  type: "page-type/module",
  slug: "mobile-ssh",
  definition: "the ssh and rsync child processes that reach an ssh target",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A script reaches the host as a file rsynced to the host.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value the script must not carry is sent by name through the ssh environment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The local temporary directory is removed whether or not the remote run threw.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "runSshResult answers a failing exit code rather than rejecting on the failing exit code.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A capture rejecting on that code carries the output the run had already given.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Remote stderr is inherited straight to this process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller asking to be quiet is given that stderr among the run's own output.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A quiet rsync says nothing on either stream.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A named file reaches the host alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A spawn that fails with ENOENT is reported as the tool being off PATH.",
    },
  ],
} as const satisfies Module
