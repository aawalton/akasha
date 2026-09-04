import type { Domain } from "../domains/domain.page-type.ts"

export const secret = {
  id: "01a0658b-0f02-7e04-9f41-f50f0f067218",
  pageTypeSlug: "domain",
  slug: "secret",
  definition: "a value kept from everything that does not need it",
  pluralSlug: "secrets",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A secret is committed to the repository encrypted.",
    },
    {
      invariantKind: "departure",
      statement: "Some secrets are generated inside the cluster and never committed.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing reading the repository can tell when an uncommitted secret changes.",
    },
    {
      invariantKind: "departure",
      statement: "Only a secret's value is encrypted.",
    },
    {
      invariantKind: "constraint",
      statement: "A secret's name and shape are readable to anyone holding the repository.",
    },
    {
      invariantKind: "departure",
      statement: "A decrypted secret is piped to whatever needs the secret.",
    },
    {
      invariantKind: "departure",
      statement: "No decrypted secret is written to a file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A secret on a workstation is read from `~/.secrets.env` rather than from the repository.",
    },
  ],
} as const satisfies Domain
