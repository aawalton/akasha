import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const secret = {
  id: "01a0684a-7d55-7000-bf3d-deee6d805174",
  type: "page-type",
  slug: "secret",
  definition: "one secret value under a name of its own",
  extends: ["page-type/page"],
  parts: [
    "module/secret-placing",
    "module/secret-saying",
    "module/workstation-secrets",
    "record-property/placements",
    "text-property/resource-key",
    "text-property/secret-value",
  ],
  properties: [
    { pageProperty: "record-property/placements", required: false, many: true, maxCount: null },
    { pageProperty: "text-property/secret-value", required: false, many: false, secret: true },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The value sits in the sops file beside the page and never in the page.",
    },
    {
      invariantKind: "departure",
      statement: "One page has one value.",
    },
    {
      invariantKind: "departure",
      statement: "A resource of many keys is that many pages.",
    },
    {
      invariantKind: "departure",
      statement: "A value wanted in a second resource is a second placement rather than a copy.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where a secret states a placement, the cluster is asked for the resource name and the key.",
    },
    {
      invariantKind: "departure",
      statement: "Two pages putting a value in one resource under one key are refused.",
    },
    {
      invariantKind: "gap",
      statement: "Something inside akasha places these secrets on the cluster.",
    },
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
      statement: "A secret's name and shape are readable to anyone with the repository.",
    },
    {
      invariantKind: "departure",
      statement: "A decrypted secret is piped to whatever needs the secret.",
    },
    {
      invariantKind: "departure",
      statement: "No decrypted secret is written into the repository.",
    },
    {
      invariantKind: "departure",
      statement:
        "A secret on a workstation is read from `~/.secrets.env` rather than from the repository.",
    },
    {
      invariantKind: "departure",
      statement: "A secret minted on a workstation is written into that same file.",
    },
    {
      invariantKind: "absence",
      statement: "No command answers a secret's value, minted or read.",
    },
  ],
  types: "ts",
} as const satisfies PageType
