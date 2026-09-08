import type { Module } from "@akasha/code/module"

export const checkSopsSpawnPipe = {
  id: "01a08162-54b6-7c52-9ed8-704cc2707c12",
  pageTypeSlug: "module",
  slug: "check-sops-spawn-pipe",
  definition: "the run refusing a sops call handed `/dev/stdin` as its positional path",
  code: "ts",
} as const satisfies Module
