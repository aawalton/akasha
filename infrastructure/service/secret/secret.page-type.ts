import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const secret = {
  id: "01a0684a-7d55-7000-bf3d-deee6d805174",
  type: "page-type/page-type",
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
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The value sits in the sops file beside the page and never in the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One page has one value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A resource of many keys is that many pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value wanted in a second resource is a second placement rather than a copy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where a secret states a placement, the cluster is asked for the resource name and the key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two pages putting a value in one resource under one key are refused.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Something inside akasha places these secrets on the cluster.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A secret is committed to the repository encrypted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Some secrets are generated inside the cluster and never committed.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nothing reading the repository can tell when an uncommitted secret changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a secret's value is encrypted.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A secret's name and shape are readable to anyone with the repository.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A decrypted secret is piped to whatever needs the secret.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No decrypted secret is written into the repository.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A secret minted on a workstation is written into `~/.secrets.env`.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
