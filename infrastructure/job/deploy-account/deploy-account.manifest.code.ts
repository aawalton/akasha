import { synthMulti } from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { deployAccount } from "akasha/infrastructure/job/deploy-account/deploy-account.manifest.ts"
import { JOB_NAMESPACE } from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.code.ts"

const RBAC_API = "rbac.authorization.k8s.io/v1"

const RBAC_GROUP = "rbac.authorization.k8s.io"

const EVERY_ACTION = "cluster-admin"

function accountYaml(): string {
  return synthMulti(deployAccount.slug, [
    {
      id: "service-account",
      manifest: {
        apiVersion: "v1",
        kind: "ServiceAccount",
        metadata: {
          name: deployAccount.slug,
          namespace: JOB_NAMESPACE,
        },
      },
    },
    {
      id: "cluster-role-binding",
      manifest: {
        apiVersion: RBAC_API,
        kind: "ClusterRoleBinding",
        metadata: {
          name: deployAccount.slug,
        },
        roleRef: {
          apiGroup: RBAC_GROUP,
          kind: "ClusterRole",
          name: EVERY_ACTION,
        },
        subjects: [
          {
            kind: "ServiceAccount",
            name: deployAccount.slug,
            namespace: JOB_NAMESPACE,
          },
        ],
      },
    },
  ])
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: deployAccount.slug, yaml: accountYaml() }]
}
