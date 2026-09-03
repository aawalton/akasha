import { buildkitBuild } from "@akasha/workflow-language/buildkit"
import { IMAGES, REGISTRY } from "@akasha/workflow-language/images"
import { step } from "@akasha/workflow-language/step"
import { workflow } from "@akasha/workflow-language/workflow"
import type { CIContext } from "@akasha/workflow-language/workflow-types"

const BUN_NATIVE = IMAGES.BUN_ALPINE
const PUBLIC_BUN = IMAGES.BUN
const PUBLIC_BUILDKIT = IMAGES.BUILDKIT_PUBLIC

const CI_IMAGE_SERVICES = ["ci", "bun-git", "buildkit", "kubectl"] as const

const INTERNAL_REGISTRY = "registry.registry.svc.cluster.local:5000"

const buildImageStep = (svc: string) => ({
  ...buildkitBuild({
    name: `ci-images-build-${svc}-image`,
    context: "akasha/infrastructure/dockerfiles",
    filename: `Dockerfile.${svc}`,
    tag: (ci) => `${REGISTRY}/cluster/${svc}:${ci.inputsHash}`,
    image: PUBLIC_BUILDKIT,
    cache: false,
  }),
  skipIfTagExists: (ci: CIContext) => `${REGISTRY}/cluster/${svc}:${ci.inputsHash}`,
  dependsOn: ["ci-images-generate-dockerfiles"],
})

export default workflow("ci-images", {
  kind: "foundation",
  dependsOn: ["buildkit", "preparation"],
  when: { branch: "main", event: "push" },
  dispatchNodeTypes: ["dockerfile-recipe"],
  steps: [
    {
      ...step({
        name: "ci-images-generate-dockerfiles",
        image: BUN_NATIVE,
        commands: (ci) => [
          "set -e",
          ...CI_IMAGE_SERVICES.map(
            (svc) =>
              `bun ${ci.workspace}/infra/scripts/src/generate-dockerfiles.ts --service ${svc}`
          ),
        ],
        environment: { HUSKY: "0" },
        backendOptions: {
          kubernetes: { resources: { limits: { memory: "4Gi" } } },
        },
      }),
      skipIfTagExists: (ci) => `${REGISTRY}/cluster/ci:${ci.inputsHash}`,
    },
    buildImageStep("ci"),
    buildImageStep("bun-git"),
    buildImageStep("buildkit"),
    buildImageStep("kubectl"),
    step({
      name: "ci-images-retag-latest",
      image: PUBLIC_BUN,
      dependsOn: [
        "ci-images-build-ci-image",
        "ci-images-build-bun-git-image",
        "ci-images-build-buildkit-image",
        "ci-images-build-kubectl-image",
      ],
      commands: (ci) => [
        "set -e",
        ...CI_IMAGE_SERVICES.map((name) =>
          [
            `echo "Re-tagging cluster/${name}:${ci.inputsHash} -> :latest"`,
            `MANIFEST=$(curl -sf -H "Accept: application/vnd.oci.image.index.v1+json" http://${INTERNAL_REGISTRY}/v2/cluster/${name}/manifests/${ci.inputsHash} || curl -sf -H "Accept: application/vnd.docker.distribution.manifest.v2+json" http://${INTERNAL_REGISTRY}/v2/cluster/${name}/manifests/${ci.inputsHash})`,
            `CONTENT_TYPE=$(echo "$MANIFEST" | head -c 1000 | grep -q '"mediaType".*oci' && echo "application/vnd.oci.image.index.v1+json" || echo "application/vnd.docker.distribution.manifest.v2+json")`,
            `curl -sf -X PUT -H "Content-Type: $CONTENT_TYPE" -d "$MANIFEST" http://${INTERNAL_REGISTRY}/v2/cluster/${name}/manifests/latest`,
          ].join(" && ")
        ),
      ],
    }),
  ],
})
