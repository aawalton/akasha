import type { Domain } from "@akasha/domain-system/domain"

export const test = {
  id: "01a04f3e-eea5-79ee-8d0b-c822c492a981",
  pageTypeSlug: "domain",
  slug: "test",
  definition: "a run holding code to what its page says of it",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A test names one thing held true.",
    },
    {
      invariantKind: "departure",
      statement: "A test over invented data proves what the fixture holds.",
    },
    {
      invariantKind: "departure",
      statement: "A test over the pages proves what the pages hold.",
    },
    {
      invariantKind: "departure",
      statement: "Neither test stands for the other.",
    },
    {
      invariantKind: "departure",
      statement:
        "A test reaching the pages reads the pages whole rather than pinning what the test found.",
    },
    {
      invariantKind: "gap",
      statement: "A test that would pass over an empty world does not land.",
    },
  ],
} as const satisfies Domain
