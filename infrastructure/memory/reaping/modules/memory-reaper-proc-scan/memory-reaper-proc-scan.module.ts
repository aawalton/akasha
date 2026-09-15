import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const memoryReaperProcScan = {
  id: "01a0686c-f06b-7000-bd79-2d9700be871d",
  type: "page-type/module",
  slug: "memory-reaper-proc-scan",
  definition: "what one process has, and whether that process is a container",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A process this module cannot read is passed over rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A process in a rootless-podman cgroup is a container rather than a fleet process.",
    },
  ],
} as const satisfies Module
