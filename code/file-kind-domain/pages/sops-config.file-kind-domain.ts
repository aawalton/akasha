import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const sopsConfig = {
  id: "01a0d58a-70ad-7523-899b-45f6263a1bc6",
  type: "page-type/file-kind-domain",
  slug: "sops-config",
  definition: "a file of the rules sops encrypts by",
  namePatterns: [".sops.yaml"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The sops config is sops's own rules rather than a secret.",
    },
  ],
} as const satisfies FileKindDomain
