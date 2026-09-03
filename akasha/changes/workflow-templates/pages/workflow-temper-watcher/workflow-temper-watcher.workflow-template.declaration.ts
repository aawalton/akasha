import { buildkitBuild } from "@akasha/workflow-language/buildkit"
import { REGISTRY } from "@akasha/workflow-language/images"
import { step } from "@akasha/workflow-language/step"
import { workflow } from "@akasha/workflow-language/workflow"

const PUBLIC_BUN = "debian:bookworm-slim"

const NEXT_PUBLIC_SUPABASE_ANON_KEY =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImpMOTJyQVNpV0lqMTd6M2cifQ.eyJpc3MiOiJodHRwczovL3N1cGFiYXNlLmFsYW53YWx0b24uY29tL2F1dGgvdjEiLCJyZWYiOiJhbGFud2FsdG9uLXBnMTgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc3Njg3MTUwNiwiZXhwIjoyMDkyMjMxNTA2fQ.hxSMOLkfCZf3Z8hu9VgzszHOxLktt8tAx96QNrXvFML4JofiEyY0DWjFH7rhNYG6dIFZBeg-HVon2OXSniYJte1e6Imxb1CEUQUQFHzTsD8D_Rjw3WUBgHQLd9UdL-RAVj4HExqJ-kT8B37TwzgkeJYwnVg51xhj_Q0uF6atKXlitvkB3sgHQAw1zIxFq6BkJ1XwEKEOJrl_PkIO_o-zvDcTqXKbAIGGmZy9yJ7fP6TlQS6WOi21caLSeenzi63NYalhlVHb2QVGyDgiq2hIc2VAEhaIbc_m50GlYMGGJsDccKJ-gYIY3r-BearbsvFFgQFViHniQ8t2TSpuU4QqFQ"

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
          NEXT_PUBLIC_SUPABASE_ANON_KEY,
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
