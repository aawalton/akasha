import { IMAGES } from "../../../instructions/tools/lib/workflow-dsl/images"
import { step } from "../../../instructions/tools/lib/workflow-dsl/step"
import { workflow } from "../../../instructions/tools/lib/workflow-dsl/workflow"

export default workflow("domain-expiry-probe", {
  kind: "foundation",
  dependsOn: ["preparation", "ci"],
  when: { branch: "main", event: "push" },
  dispatchNodes: [
    "workflow:instructions:domain-expiry-probe",
    "k8s-resource:code:CronJob/ci/domain-expiry-probe",
  ],
  steps: [
    step({
      name: "domain-expiry-probe-apply",
      image: IMAGES.KUBECTL,
      environment: { HOME: "/tmp" },
      commands: [
        "set -e",
        "kubectl apply --server-side --force-conflicts -f packages/infra/domain-expiry/k8s/generated/cronjob.generated.yaml",
        "kubectl get cronjob domain-expiry-probe -n ci",
      ],
      backendOptions: {
        kubernetes: { serviceAccountName: "pipeline-engine" },
      },
    }),
  ],
})
