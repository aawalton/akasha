import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const test = {
  id: "01a04f3e-eea5-79ee-8d0b-c822c492a981",
  pageTypeSlug: "domain",
  slug: "test",
  definition: "a run holding code to what its page says of it",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A test names one thing held true, so a run that fails says what stopped being so rather than only where it stopped.",
    },
    {
      invariantKind: "departure",
      statement:
        "A test over invented data proves what the fixture holds; a test over the corpus proves what the corpus holds. Neither stands for the other.",
    },
    {
      invariantKind: "departure",
      statement:
        "A test reaching the corpus reads it whole rather than pinning what it found, because the corpus grows under every run.",
    },
    {
      invariantKind: "gap",
      statement: "A test that would pass over an empty world does not land.",
    },
  ],
} as const satisfies Domain
