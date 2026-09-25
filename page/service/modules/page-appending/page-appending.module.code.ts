import { existsSync } from "node:fs"
import { join } from "node:path"
import { recorded } from "akasha/check/modules/cost/check-cost.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import type { Faulted } from "akasha/page/service/modules/refusal-fault/refusal-fault.module.code.ts"

const ENTRIES = "entries"

export type Appending = {
  readonly path: string
  readonly under?: string
  readonly lines: readonly string[]
}

export type Appended = { readonly appended: string } | { readonly refused: string }

function landed(root: string, asked: Appending): Faulted<Appended> {
  const text = asked.lines.map((one) => `${one}\n`).join("")
  const at = recorded(root, asked.path, text, asked.under ?? ENTRIES)
  if (at === null) {
    const refused = `\`${asked.path}\` came free for no turn, so no line was appended beside it`
    return { refused, fault: "race" }
  }
  return { appended: at }
}

export function appending(root: string, asked: Appending): Faulted<Appended> {
  if (!existsSync(join(root, asked.path))) {
    const refused = `\`${asked.path}\` names no page here, so no line was appended`
    return { refused, fault: "caller" }
  }
  try {
    return landed(root, asked)
  } catch (thrown) {
    return { refused: saidBy(thrown), fault: "service" }
  }
}
