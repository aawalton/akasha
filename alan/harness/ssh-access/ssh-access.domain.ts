import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const sshAccess = {
  id: "01a05c2f-0f02-7fb7-aaea-fff4b50ef0c6",
  type: "page-type/domain",
  slug: "ssh-access",
  definition: "how a script is run on another machine over ssh and its output read back",
  parts: ["module/ssh-reach", "module/ssh-target"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every machine reached from here is reached the one way.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows the purpose of any script this package has.",
    },
  ],
} as const satisfies Domain
