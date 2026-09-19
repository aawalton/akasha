import type { AnswersACheckoutRoot } from "akasha/code/module/properties/answers-a-checkout-root.boolean-property.types.ts"
import type { Code } from "akasha/code/module/properties/code.code-file-property.types.ts"
import type { PageBodyReaders } from "akasha/code/module/properties/page-body-readers.text-property.types.ts"
import type { ReachedByPath } from "akasha/code/module/properties/reached-by-path.text-property.types.ts"
import type { Test } from "akasha/code/module/properties/test.code-file-property.types.ts"
import type { TestFixtures } from "akasha/code/module/properties/test-fixtures.code-file-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { AllowsTmpPaths } from "akasha/page/type/properties/allows-tmp-paths.boolean-property.types.ts"

export type Module = Domain & {
  code: Code
  test?: Test
  testFixtures?: TestFixtures
  allowsTmpPaths?: AllowsTmpPaths
  answersACheckoutRoot?: AnswersACheckoutRoot
  pageBodyReaders?: PageBodyReaders
  reachedByPath?: ReachedByPath
}
