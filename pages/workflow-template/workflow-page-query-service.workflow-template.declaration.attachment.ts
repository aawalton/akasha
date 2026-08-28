import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

export default workflow("page-query-service", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "page-query-service-apply-namespace",
      namespace: "page-query-service",
      files: "infra/k8s/src/page-query-service/generated/namespace.generated.yaml",
      serverSide: true,
    }),

    {
      ...kubectlApply({
        name: "page-query-service-apply-service",
        namespace: "page-query-service",
        files: "infra/k8s/src/page-query-service/generated/service.generated.yaml",
        serverSide: true,
      }),
      dependsOn: ["page-query-service-apply-namespace"],
    },

    {
      ...kubectlApply({
        name: "page-query-service-apply-endpointslice",
        namespace: "page-query-service",
        files: "infra/k8s/src/page-query-service/generated/endpointslice.generated.yaml",
        serverSide: true,
      }),
      dependsOn: ["page-query-service-apply-service"],
    },
  ],
})
