import { valueAlsoFiled } from "@akasha/indexes/testing"
import { keepUncommitted } from "@akasha/pages/page-uncommitted"
import { subagentReturned } from "akasha/seat-system/subagents/properties/subagent-returned.boolean-property.ts"
import type { FileChange } from "../answer/change-answer.module.types.ts"
import { appendEdits } from "../edits-keeping/edits-keeping.module.code.ts"
import { handedPageOf } from "./subagent-handed.module.code.ts"

const SUBAGENT = "subagent"

export function noSubagentFiled(root: string): undefined {
  valueAlsoFiled(root, SUBAGENT, [])
}

export function subagentFiled(root: string, under: string): string {
  const at = handedPageOf(under)
  valueAlsoFiled(root, SUBAGENT, [{ path: at, value: { id: under, slug: under } }])
  return at
}

export function returnedFrom(root: string, under: string): undefined {
  keepUncommitted(root, handedPageOf(under), { [subagentReturned.propertySlug]: true })
}

export function handedFrom(root: string, under: string, rows: readonly FileChange[]): undefined {
  appendEdits(root, subagentFiled(root, under), rows)
  returnedFrom(root, under)
}
