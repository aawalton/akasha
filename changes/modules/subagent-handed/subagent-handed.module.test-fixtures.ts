import { valueAlsoFiled } from "@akasha/indexes/testing"
import { keepUncommitted } from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"
import { subagentReturned } from "akasha/seat-system/subagents/properties/subagent-returned.boolean-property.ts"
import type { FileChange } from "../answer/change-answer.module.types.ts"
import { appendEdits } from "../edits-keeping/edits-keeping.module.code.ts"

const SUBAGENT = "subagent"

const UNDER = "seat-system/subagents/pages"

export function pageOf(under: string): string {
  return `${UNDER}/${under}/${under}.subagent.ts`
}

export function noSubagentFiled(root: string): undefined {
  valueAlsoFiled(root, SUBAGENT, [])
}

export function subagentFiled(root: string, under: string): string {
  const at = pageOf(under)
  valueAlsoFiled(root, SUBAGENT, [{ path: at, value: { id: under, slug: under } }])
  return at
}

export function returnedFrom(root: string, under: string): undefined {
  keepUncommitted(root, pageOf(under), { [subagentReturned.propertySlug]: true })
}

export function handedFrom(root: string, under: string, rows: readonly FileChange[]): undefined {
  appendEdits(root, subagentFiled(root, under), rows)
  returnedFrom(root, under)
}
