import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const buildHashTestUtils = {
  id: "01a08ed5-cc31-7873-bde1-0132ef1d98b5",
  type: "page-type/test-fixture",
  slug: "build-hash-test-utils",
  definition: "a build hash a test makes by stamping a chosen update into bytes",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The update a build was written at is the second byte of that build's bytes.",
    },
  ],
} as const satisfies TestFixture
