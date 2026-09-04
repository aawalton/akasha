import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const upscale = {
  id: "01a06815-9efd-7040-a13c-1048a109ba86",
  pageTypeSlug: "workspace-package",
  slug: "upscale",
  definition: "an image remade at a higher resolution than the one it came in at",
  manifest: "json",
  partSlugs: [
    "container-recipe/upscale-cluster-image",
    "container-recipe/upscale-image",
    "module/upscale-bench-synth",
    "module/upscale-cluster",
    "manifest/upscale-serving-job",
    "module/upscale-workstation",
    "python-module/upscale-srpo-graph",
    "shell-script/upscale-bench-runner",
    "shell-script/upscale-cluster-publish",
    "shell-script/upscale-down",
    "shell-script/upscale-provision",
    "shell-script/upscale-run",
    "shell-script/upscale-seedvr2",
    "shell-script/upscale-smoke",
    "shell-script/upscale-srpo",
    "shell-script/upscale-up",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run cleans the image up first and refines its skin second.",
    },
    {
      invariantKind: "departure",
      statement: "The refining stage is skipped where its weights are not on the machine.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The upscaling tool answers zero when it runs out of memory, so its answer is not believed.",
    },
    {
      invariantKind: "departure",
      statement: "A run goes either to a cluster GPU or to the workstation's own.",
    },
  ],
} as const satisfies WorkspacePackage
