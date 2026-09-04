import { buildkitBuild } from "@akasha/workflow-language/buildkit"
import { REGISTRY } from "@akasha/workflow-language/images"
import { step } from "@akasha/workflow-language/step"
import { workflow } from "@akasha/workflow-language/workflow"

const PUBLIC_BUN = "debian:bookworm-slim"

const INTERNAL_REGISTRY = "registry.registry.svc.cluster.local:5000"
const IMAGE_NAME = "cluster/temper-watcher"

export default workflow("temper-watcher", {
  kind: "foundation",
  dependsOn: ["buildkit", "preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    {
      ...buildkitBuild({
        name: "temper-watcher-build-image",
        context: ".",
        dockerfile: "infra/k8s/src/temper-watcher/build",
        tag: (ci) => `${REGISTRY}/${IMAGE_NAME}:${ci.inputsHash}`,
        buildArgs: {
          COMMIT_SHA: (ci) => ci.commitSha,
        },
      }),
      skipIfTagExists: (ci) => `${REGISTRY}/${IMAGE_NAME}:${ci.inputsHash}`,
    },
    step({
      name: "temper-watcher-retag-latest",
      image: PUBLIC_BUN,
      dependsOn: ["temper-watcher-build-image"],
      commands: (ci) => [
        "set -e",
        `echo "Re-tagging ${IMAGE_NAME}:${ci.inputsHash} -> :latest"`,
        `MANIFEST=$(curl -sf -H "Accept: application/vnd.oci.image.index.v1+json" http://${INTERNAL_REGISTRY}/v2/${IMAGE_NAME}/manifests/${ci.inputsHash} || curl -sf -H "Accept: application/vnd.docker.distribution.manifest.v2+json" http://${INTERNAL_REGISTRY}/v2/${IMAGE_NAME}/manifests/${ci.inputsHash})`,
        `CONTENT_TYPE=$(echo "$MANIFEST" | head -c 1000 | grep -q '"mediaType".*oci' && echo "application/vnd.oci.image.index.v1+json" || echo "application/vnd.docker.distribution.manifest.v2+json")`,
        `curl -sf -X PUT -H "Content-Type: $CONTENT_TYPE" -d "$MANIFEST" http://${INTERNAL_REGISTRY}/v2/${IMAGE_NAME}/manifests/latest`,
      ],
    }),
  ],
})
