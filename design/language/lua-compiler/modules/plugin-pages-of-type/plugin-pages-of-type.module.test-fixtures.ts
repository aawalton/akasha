import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

export function holdPagesOfTypeFromCheckout(): undefined {
  const root = akashaRoot()
  const pagesOfType = (pageType: { readonly slug: string }): readonly unknown[] =>
    valuesOfType(root, pageType.slug).map((one) => one.value)
  Object.assign(globalThis, { $pagesOfType: pagesOfType })
  return undefined
}
