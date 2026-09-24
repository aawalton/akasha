import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"

const PAGE_TYPE = "model-version"

const MODEL_ID = "modelId"

const SLUG = "slug"

const QUALIFIED_BY = "/"

function firstText(root: string, key: string, is: string, wanted: string): string | null {
  const asked = asking(root, { pageTypeSlug: PAGE_TYPE, where: { [key]: { is } }, keys: [wanted] })
  if ("refused" in asked) return null
  const held = asked.rows[0]?.[wanted]
  return typeof held === "string" && held !== "" ? held : null
}

function checkoutRoot(): string {
  return rootFor(resolveRoots(), AKASHA)
}

export function modelVersionOf(modelId: string, root: string = checkoutRoot()): string | null {
  const slug = firstText(root, MODEL_ID, modelId, SLUG)
  return slug === null ? null : `${PAGE_TYPE}${QUALIFIED_BY}${slug}`
}

export function modelIdOf(address: string, root: string = checkoutRoot()): string | null {
  const opening = `${PAGE_TYPE}${QUALIFIED_BY}`
  if (!address.startsWith(opening)) return null
  return firstText(root, SLUG, address.slice(opening.length), MODEL_ID)
}
