import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const infrastructureKernel = {
  id: "01a05c67-00ac-7c6f-a5c8-9391ef1427fe",
  type: "page-type/domain",
  slug: "infrastructure-kernel",
  definition: "what the Linux kernel says about the workstation, read from the kernel's own files",
  parts: ["module/inode-guard", "module/landing-admission", "module/memory-guard"],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Everything here reads a file only Linux has.",
    },
  ],
} as const satisfies Domain
