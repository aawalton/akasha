import type { Asked } from "@akasha/pages-query"
import { answerIn } from "../../../readouts/ask-answer.ts"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { rootsHere } from "@akasha/pages-system/checkout-roots"
import type { Said } from "../../../tools/lib/page-query-request.ts"
import { reaches } from "../../../tools/lib/page-query.ts"

let held: Roots | null = null

export function here(): Roots {
  held ??= rootsHere()
  return held
}

export function standsHere(pageType: string): boolean {
  return reaches(here(), pageType)
}

export function whyIn(said: Said): string {
  const body = said.body
  if (typeof body === "object" && body !== null) {
    const error = (body as { readonly error?: unknown }).error
    if (typeof error === "string") return error
  }
  return `the pages on this machine answered ${said.status}`
}

export function askedOf(said: Said): Asked {
  if (said.status !== 200) return { ok: false, why: whyIn(said), status: said.status }
  return { ok: true, answer: answerIn(said.body) }
}
