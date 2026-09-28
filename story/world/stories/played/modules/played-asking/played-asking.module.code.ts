import { reportError } from "akasha/alan/harness/errors-client/modules/error-reporting/error-reporting.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import type {
  Asked,
  ComposedQuery,
} from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"

const APP = "alanwalton"

const MESSAGE_MOST = 2048

const STACK_MOST = 16384

type Asking = (query: ComposedQuery) => Promise<Asked>

type Reporting = (said: string) => undefined

export function refusalSaid(query: ComposedQuery, why: string): string {
  return `the play screen's question over \`${query["page-type"]}\` was refused: ${why} — the question was ${JSON.stringify(query)}`
}

export function reportFault(said: string): undefined {
  console.error(said)
  reportError({
    message: said.slice(0, MESSAGE_MOST),
    stack: said.slice(0, STACK_MOST),
    kind: "error",
    app: APP,
    errorUserId: null,
  })
}

export function reportThrown(what: string, thrown: unknown): undefined {
  reportFault(`${what} threw: ${saidBy(thrown)}`)
}

export async function askedLoudly(
  query: ComposedQuery,
  asking: Asking = askComposed,
  reporting: Reporting = reportFault
): Promise<Asked> {
  const asked = await asking(query)
  if (!asked.ok) reporting(refusalSaid(query, asked.why))
  return asked
}
