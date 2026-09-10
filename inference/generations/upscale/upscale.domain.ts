import type { Domain } from "../../../domains/domain.page-type.types.ts"

export const upscale = {
  id: "01a06815-9efd-7040-a13c-1048a109ba86",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "upscale",
  definition: "an image remade at a higher resolution than the one it came in at",
  parts: [
    "container-recipe/upscale-cluster-image",
    "container-recipe/upscale-image",
    "module/upscale-bench-synth",
    "module/upscale-cluster",
    "module/upscale-serving-job",
    "module/upscale-workstation",
    "python-module/upscale-srpo-graph",
    "shell-script/upscale-bench-runner",
    "shell-script/upscale-cluster-publish",
    "shell-script/upscale-down",
    "shell-script/upscale-provision",
    "shell-script/upscale-run",
    "shell-script/upscale-seedvr2",
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
      statement: "The upscaling tool answers zero when that tool runs out of memory.",
    },
    {
      invariantKind: "constraint",
      statement: "The tool's answer is not believed.",
    },
    {
      invariantKind: "departure",
      statement: "A run goes either to a cluster GPU or to the workstation's own.",
    },
  ],
} as const satisfies Domain
