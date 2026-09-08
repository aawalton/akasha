import { IMAGES } from "@akasha/workflow-language/images"
import { step } from "@akasha/workflow-language/step"
import { workflow } from "@akasha/workflow-language/workflow"
import { installDepsCommands } from "../../../preparation-installing/preparation-installing.module.code.ts"
import { PREP_PROVISION_STEPS } from "../../../preparation-provisioning/preparation-provisioning.module.code.ts"
import {
  PREP_SELFHEAL_SH_FUNCTIONS,
  prepFetchWithSelfHeal,
} from "../../../preparation-repo-mending/preparation-repo-mending.module.code.ts"

export default workflow("preparation", {
  kind: "preparation",
  dispatchNodes: ["package:code:@akasha/k8s-synth"],
  dispatchNodeTypes: ["package", "md-file"],
  alwaysRun: true,
  steps: [
    ...PREP_PROVISION_STEPS,

    {
      ...step({
        name: "preparation-prep",
        image: IMAGES.BUN_GIT,
        alwaysRun: true,
        environment: {
          BUN_INSTALL_CACHE_DIR: "/ci-storage/bun-cache",
          BUN_TMPDIR: "/ci-storage/tmp",
        },
        backendOptions: {
          kubernetes: {
            resources: {
              requests: { memory: "2Gi" },
              limits: { memory: "4Gi" },
            },
          },
        },
        commands: (ci) => [
          "set -e",

          PREP_SELFHEAL_SH_FUNCTIONS,

          "if [ ! -f /ci-storage/repo/HEAD ]; then",
          "  git init --bare /ci-storage/repo",
          "  git -C /ci-storage/repo config gc.auto 0 || true",
          "fi",

          "rm -f /ci-storage/repo/gc.log",

          `WS=/ci-storage/checkouts/${ci.commitSha}`,

          "PREP_FETCH_ERR=$(mktemp)",

          "(",
          '  flock -x -w 60 9 || { echo "ERROR: prep flock timeout (#9479)" >&2; exit 1; }',
          "  git -C /ci-storage/repo worktree prune || true",
          ...prepFetchWithSelfHeal(
            `git -C /ci-storage/repo fetch --force "http://x-access-token:$GIT_ACCESS_TOKEN@git-transport.git.svc.cluster.local:3000/alan/akasha.git" ${ci.commitSha}:refs/pipelines/${ci.commitSha}`
          ),
          '  if [ -d "$WS/.git" ] || [ -f "$WS/.git" ]; then',
          `    echo "Reusing worktree (commit ${ci.commitSha})"`,
          "  else",
          `    git -C /ci-storage/repo worktree add --detach "$WS" ${ci.commitSha} || exit 1`,
          "  fi",
          ") 9>/ci-storage/.prep-repo.flock || exit 1",
          'rm -f "$PREP_FETCH_ERR"',

          ...installDepsCommands(ci.commitSha),

          'mkdir -p "$WS/.ci"',
          `bun "$AKASHA_ROOT/changes/workflow-selection/changed-files-writing/changed-files-writing.module.code.ts" --seq "$PIPELINE_SEQ" --out "$WS/.ci/changed-files.txt" || exit 1`,

          `echo "Workspace ready (commit ${ci.commitSha}, ${ci.changedFiles?.length ?? 0} changed files)"`,
        ],
      }),
      dependsOn: ["preparation-provision-ci-toolchain"],
    },

    {
      ...step({
        name: "preparation-synth-k8s",
        image: IMAGES.BUN_GIT,
        alwaysRun: true,
        commands: (ci) => [
          "set -e",
          `WS=/ci-storage/checkouts/${ci.commitSha}`,
          `bun "$AKASHA_ROOT/infrastructure/cluster/k8s-synth/synth-running/synth-running.module.code.ts" --write --root "$WS"`,
        ],
      }),
      dependsOn: ["preparation-prep"],
    },
  ],
})
