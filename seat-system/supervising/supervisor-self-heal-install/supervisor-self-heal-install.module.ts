import type { Module } from "@akasha/code/module"

export const supervisorSelfHealInstall = {
  id: "01a06876-abda-7010-b833-f472fa23d6e8",
  pageTypeSlug: "module",
  slug: "supervisor-self-heal-install",
  definition: "running the install a self-heal needs, one flight at a time",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A path the install script reads reaches the script as an argument rather than as text.",
    },
    {
      invariantKind: "departure",
      statement: "One install runs at a time across every supervisor.",
    },
    {
      invariantKind: "departure",
      statement: "A lock file has that install.",
    },
    {
      invariantKind: "departure",
      statement:
        "A supervisor waiting past the lock ceiling keeps its image rather than installing.",
    },
    {
      invariantKind: "departure",
      statement: "An install already done for a version is not run a second time.",
    },
    {
      invariantKind: "departure",
      statement:
        "A verify that fails is answered by installing once more before the verify is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The verifier's place is worked out when an install runs rather than on loading.",
    },
  ],
} as const satisfies Module
