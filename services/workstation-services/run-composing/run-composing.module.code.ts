import { addressedIn } from "akasha/pages/address/page-address.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedFor } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const RUNNER = "bun"
const CODE = "code"
const TS = "ts"
const LENIENT = "-"
const SPACE = " "

export type Start = {
  readonly module: string
  readonly before?: readonly string[]
  readonly pages?: readonly string[]
  readonly arguments?: readonly string[]
  readonly lenient?: boolean
}

export type Refused = { readonly refused: string }

export type Composed = { readonly command: string } | Refused

export function pathOf(root: string, named: string): string | Refused {
  const address = addressedIn(named)
  if ("refused" in address) return address
  const one = listedFor(root, address)
  if (one === null) {
    return { refused: `\`${named}\` names no page, so no command can be composed naming it` }
  }
  return one.path
}

export function codeOf(root: string, named: string): string | Refused {
  const page = pathOf(root, named)
  if (typeof page !== "string") return page
  const at = besideAt(page, CODE, TS)
  if (at === null) {
    return { refused: `\`${page}\` is no TypeScript page, so no code file sits beside it` }
  }
  return at
}

export function commandOf(root: string, start: Start): Composed {
  const code = codeOf(root, start.module)
  if (typeof code !== "string") return code
  const words: string[] = [...(start.before ?? []), RUNNER, code]
  for (const named of start.pages ?? []) {
    const at = pathOf(root, named)
    if (typeof at !== "string") return at
    words.push(at)
  }
  words.push(...(start.arguments ?? []))
  return { command: `${start.lenient === true ? LENIENT : ""}${words.join(SPACE)}` }
}

export function commandsOf(root: string, starts: readonly Start[]): readonly string[] | Refused {
  const found: string[] = []
  for (const one of starts) {
    const said = commandOf(root, one)
    if ("refused" in said) return said
    found.push(said.command)
  }
  return found
}
