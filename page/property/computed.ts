import { listField, type Frontmatter, textField } from "../frontmatter.ts"
import { stringAt } from "../text/text.ts"

export const COMPUTED = "computed"

const EXPRESSION = "expression"

const FROM = "from"

const BACK = "back-from"

const RELATION = "relation"

export function answeredOn(fm: Frontmatter): boolean {
  return (
    textField(fm, EXPRESSION) !== null ||
    stringAt(fm, RELATION) !== null ||
    listField(fm, FROM).length > 0 ||
    stringAt(fm, BACK) !== null
  )
}

export function statedOn(fm: Frontmatter): boolean {
  return stringAt(fm, COMPUTED) === "true"
}

export function computedOn(fm: Frontmatter): boolean {
  return answeredOn(fm) || statedOn(fm)
}
