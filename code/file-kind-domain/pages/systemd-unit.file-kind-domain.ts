import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const systemdUnit = {
  id: "01a0d58a-70ad-7f72-8fe9-f19815341cd2",
  type: "page-type/file-kind-domain",
  slug: "systemd-unit",
  definition: "a file of systemd unit settings",
  namePatterns: ["*.service", "*.timer"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A systemd timer needs the service that timer starts.",
    },
  ],
  createdAt: "2026-09-24T22:30:14.957Z",
  updatedAt: "2026-09-24T22:30:20.000Z",
} as const satisfies FileKindDomain
