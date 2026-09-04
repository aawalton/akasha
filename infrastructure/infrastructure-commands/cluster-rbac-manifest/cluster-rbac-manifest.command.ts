import type { Command } from "@akasha/command-system/command"

export const clusterRbacManifest = {
  id: "01a06809-a024-7f4a-9ec2-91ff95095789",
  pageTypeSlug: "command",
  slug: "cluster-rbac-manifest",
  definition: "the command writing the deploy account's cluster RBAC as one YAML document",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [],
  helpNotes: [
    "the document carries the `pipeline-engine` service account, the cluster-deploy role and its binding, and the ci namespace role and binding.",
    "the profiles the namespace roles are read from stand under the repository root, so nothing here is named a tree to read.",
    "nothing is reported where the cluster role would not cover every permission a namespace role grants.",
    "Kubernetes would refuse such a role at the deploy applying it, and writing the incomplete cluster role first is what puts the cluster there.",
    "the gaps named in that refusal are the gaps the rbac-escalation check names.",
    "the document carries a header saying it is generated, and the rules it carries are edited where they are declared rather than here.",
    "a run that refuses reports nothing rather than half a manifest.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The cluster role covers every permission a namespace role grants.",
    },
    {
      invariantKind: "departure",
      statement: "A gap in that cover refuses the whole document rather than part of it.",
    },
    {
      invariantKind: "departure",
      statement: "A gap is named by its profile's path, its namespace, and the permission itself.",
    },
    {
      invariantKind: "departure",
      statement: "The profiles are read against the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "The document is one stream of sections divided by a YAML document marker.",
    },
    {
      invariantKind: "departure",
      statement: "The document says it is generated and where its rules are declared.",
    },
    {
      invariantKind: "departure",
      statement: "The ci namespace role grants create on pods, which the cluster role does not.",
    },
    {
      invariantKind: "departure",
      statement: "That role is admitted because the account applying it already holds that verb.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here applies the document to a cluster.",
    },
    {
      invariantKind: "absence",
      statement: "The rbac-escalation check does not weigh the ci namespace role.",
    },
  ],
} as const satisfies Command
