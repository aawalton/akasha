import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const sopsSecret = {
  id: "01a0d58a-70ad-7176-964c-e4a3de48186c",
  type: "page-type/file-kind-domain",
  slug: "sops-secret",
  definition: "a file of secrets sops encrypts",
  namePatterns: ["*.sops.yaml"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sops secret is not yaml.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sops secret's keys are sops's own and its values are ciphertext.",
    },
  ],
} as const satisfies FileKindDomain
