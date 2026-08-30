import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const testingSystem = {
  id: "01a04ee7-be05-75c4-ba3c-3fd73f943961",
  pageTypeSlug: "domain",
  slug: "testing-system",
  definition: "what a test stands up to try something, and what it takes away after",
  partSlugs: [
    "domain/test",
    "domain/test-fixture",
    "module/declaring",
    "module/minting",
    "module/bodying",
    "module/gitting",
    "module/waiting",
    "module/walking",
    "module/putting",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Scaffolding a test stands up is not the thing under test.",
    },
    {
      invariantKind: "departure",
      statement: "What the tests of more than one system need stands here.",
    },
    {
      invariantKind: "departure",
      statement: "What one module's tests need stands in fixtures beside that module.",
    },
    {
      invariantKind: "departure",
      statement:
        "A fixture beside a module reaches for what stands here rather than spelling it again.",
    },
    {
      invariantKind: "departure",
      statement: "What stands here is reached by tests alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A module the running system also reaches for belongs to the system that runs it however much its tests want it too.",
    },
    {
      invariantKind: "absence",
      statement: "No test is written here.",
    },
    {
      invariantKind: "absence",
      statement: "What stands here is stood up by the tests that reach for it.",
    },
    {
      invariantKind: "absence",
      statement: "A fixture proving itself proves nothing about the system.",
    },
  ],
} as const satisfies Domain
