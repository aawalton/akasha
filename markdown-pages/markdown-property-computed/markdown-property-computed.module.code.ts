import {
  type Frontmatter,
  listField,
  textField,
} from "../markdown-frontmatter/markdown-frontmatter.module.code.ts"
import { stringAt } from "../markdown-text-at/markdown-text-at.module.code.ts"

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
