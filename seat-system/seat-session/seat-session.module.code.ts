import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { fieldFromHistory } from "../seat-page-history/seat-page-history.module.code.ts"
import { pageTextOf } from "../seat-page-values/seat-page-values.module.code.ts"

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const SESSION_KEY = "claude-code-session-uuid"

const KEY = SESSION_KEY

export interface SessionRecord {
  readonly value: string
}

// WHAT A SEAT IS BOUND TO IS COMMITTED, SO IT IS READ OFF THE PAGE AND NOT FROM BESIDE IT. Akasha
// declares `claude-code-session-uuid` on the seat page type without `uncommitted`, which is
// deliberate and stated where the page is composed: every other observed value comes back by being
// observed again, and this one cannot, so it lives in the history rather than in a sidecar that
// goes when the page does.
//
// This read the record beside the page first. That record never existed in akasha — the key is
// absent from `CARRIED` for the same reason it is committed — so the first read answered null on
// every call and the answer came from the page underneath it.
export function sessionOf(agent: string): SessionRecord | null {
  const held = pageTextOf(agent, KEY)
  if (held !== null && UUID.test(held)) return { value: held }
  // STOPPING IS ORDINARY AND A RESUME AFTER IT IS THE NORMAL FLOW, so a seat whose page has gone is
  // read out of the history that page was committed into. That is what committing this key buys,
  // and nothing was spending it: the tree read answered null for a stopped seat and the lookup
  // ended there, which reads as "no session" when the session is a `git show` away.
  const committed = fieldFromHistory(agent, resolveRoots(), KEY)
  return committed !== null && UUID.test(committed) ? { value: committed } : null
}

// A SESSION REACHES THE SEAT BY THE PAGE BEING WRITTEN, WHICH IS THE ONLY WAY IT EVER REACHED IT.
// This kept a record beside the page, which nothing read; its callers in `seat-page-beat` hand the
// session to `writeSeatPage` explicitly on the same line, and that write is what lands it.
//
// Keeping it here is not free now that akasha carries nothing under this key: the call reaches
// `keepBeside`, which refuses it, once per beat per seat.
//
// ONE CALLER IS LEFT DEPENDING ON A WRITE THAT NEVER HAPPENED. `--self-heal-session` calls this and
// then composes the page from what the seat states, reading the session back through `sessionOf` —
// which now, as before, answers from the committed page rather than from what was just handed over.
// It has been reading the page's own value since the record read went to akasha. Naming it here
// because the self-heal path is not covered and I have not exercised it.
export function keepSession(agent: string, value: string, at?: number): void {}

export function sessionRecordOf(value: string | null): SessionRecord | null {
  return value !== null && UUID.test(value) ? { value } : null
}
