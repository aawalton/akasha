import type { Domain } from "../../domains/domain.page-type.ts"

export const temperBuildHash = {
  id: "01a062c4-7811-7457-9a0e-87d4906e32a4",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-build-hash",
  definition:
    "the bits a character build is packed into away from the game, and the text carrying them",
  parts: [
    "module/build-hash-base64url",
    "module/build-hash-bit-reader",
    "module/build-hash-bit-writer",
    "module/record-from-keys",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bit arithmetic goes through the operators the language gives.",
    },
    {
      invariantKind: "departure",
      statement: "The bits go in and come out from the most significant end.",
    },
    {
      invariantKind: "departure",
      statement: "Text that is no valid encoding is read as nothing rather than as bytes.",
    },
  ],
} as const satisfies Domain
