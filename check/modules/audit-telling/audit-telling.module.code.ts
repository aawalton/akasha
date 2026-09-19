import { writeMessage } from "akasha/agent/messaging/modules/message-file/message-file.module.code.ts"
import { check as checkDomain } from "akasha/check/check.domain.ts"
import {
  cleanly,
  measured,
  type Verdict,
} from "akasha/check/modules/audit-verdict/audit-verdict.module.code.ts"
import {
  heldTo,
  reasonSaid,
} from "akasha/check/modules/refusal-holding/refusal-holding.module.code.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import { domainsDrawn } from "akasha/domain/modules/rows/domain-rows.module.code.ts"
import {
  championing,
  passedOn,
} from "akasha/infrastructure/service/workstation/modules/service-alerting/service-alerting.module.code.ts"
import { counted } from "akasha/text/writing/modules/counted/counted.module.code.ts"

const ANSWERS_FOR = `${domain.slug}/${checkDomain.slug}` as const

const FALLBACK = "alan"

const FROM = "audit-running"

const SHOWN = 5

const BODY_CEILING = 19000

const REASON_CEILING = 240

const REASONED = " — "

const REFUSING = "newly refusing"

const NOTHING_MEASURED = "nothing measured"

const UNMEASURED = "went unmeasured"

const WHOLE =
  "what each of them answered is on the newest row of the audit log beside that check's page."

export type Sent = (to: string, body: string) => Promise<string | null>

export type Red = {
  readonly check: string
  readonly verdict: Verdict
}

export const sending: Sent = async (to, body) => {
  const wrote = await writeMessage({ to, from: FROM, warrant: "announce", body })
  return wrote.kind === "refused" ? wrote.detail : null
}

export function championOf(root: string): string {
  return championing(domainsDrawn(root))(ANSWERS_FOR) ?? FALLBACK
}

export async function telling(send: Sent, to: string, body: string): Promise<string | null> {
  const why = await send(to, body)
  if (why === null) return null
  if (to === FALLBACK) return `nothing told \`${FALLBACK}\`: ${why}`
  const then = await send(FALLBACK, passedOn(to, body, why))
  return then === null ? null : `nothing told \`${to}\` or \`${FALLBACK}\`: ${then}`
}

export function refusalPath(said: string): string {
  const at = said.indexOf(REASONED)
  return at === -1 ? said : said.slice(0, at)
}

export function refusalsNew(before: Verdict | null, after: Verdict): readonly string[] {
  if (cleanly(after)) return []
  if (before === null) return after.refusals
  const had = new Set(before.refusals.map(refusalPath))
  return after.refusals.filter((one) => !had.has(refusalPath(one)))
}

function headFor(commit: string, refused: number, unmeasured: number): string {
  const found = `the audit at ${commit} found`
  if (unmeasured === 0) return `${found} ${counted(refused, "check")} ${REFUSING}.`
  if (refused === 0) return `${found} ${counted(unmeasured, "check")} ${NOTHING_MEASURED}.`
  return (
    `${found} ${counted(refused, "check")} ${REFUSING} and ` +
    `${counted(unmeasured, "check")} ${NOTHING_MEASURED}.`
  )
}

function saidOf(one: Red): readonly string[] {
  const head = measured(one.verdict)
    ? `\`${one.check}\` refused ${counted(one.verdict.refusals.length, "time")}:`
    : `\`${one.check}\` ${UNMEASURED}:`
  return [
    head,
    ...one.verdict.refusals.slice(0, SHOWN).map((two) => `  ${reasonSaid(two, REASON_CEILING)}`),
  ]
}

export function bodyFor(red: readonly Red[], commit: string): string {
  const refused = red.filter((one) => measured(one.verdict))
  const unmeasured = red.filter((one) => !measured(one.verdict))
  return [
    headFor(commit, refused.length, unmeasured.length),
    ...heldTo([...refused, ...unmeasured].flatMap(saidOf), BODY_CEILING),
    WHOLE,
  ].join("\n")
}
