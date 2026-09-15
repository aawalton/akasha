import type { Code } from "akasha/code/module/properties/code.code-file-property.types.ts"
import type { Test } from "akasha/code/module/properties/test.code-file-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type TestFixture = Domain & {
  code: Code
  test?: Test
}
