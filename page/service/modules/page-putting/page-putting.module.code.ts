import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import { removeFileOfAnyKind } from "akasha/change/mechanical/file/remove/remove-file-of-any-kind/remove-file-of-any-kind.change-mechanical.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Put } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const TAKE = `${changeMechanical.slug}/${removeFileOfAnyKind.slug}` as const

export function putting(one: Put): Asking {
  return { at: PUT, given: { at: one.path, body: one.content } }
}

export function taking(at: string): Asking {
  return { at: TAKE, given: { at } }
}
