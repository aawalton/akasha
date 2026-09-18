import type {
  Asking,
  Row,
} from "akasha/alan/harness/readout/modules/asking/readout-asking.module.code.ts"

const REJECTION = "rejection"

const REJECTED = "rejected"

const RISKS = "risks"

const HAPPENED_AT = "happenedAt"

const ID = "id"

const ONE_RISK = 1

const REJECTIONS_UNKNOWN =
  "the rejections Alan risked could not be read, so his luck is unknown rather than nothing"

export const POINTS_FOR_A_RISK = 1

export const POINTS_FOR_A_NO = 2

export function rejectionsBetween(from: string, to: string): Readonly<Record<string, unknown>> {
  return {
    pageTypeSlug: REJECTION,
    where: { [HAPPENED_AT]: { "at-or-after": from, before: to } },
    keys: [ID, REJECTED, RISKS],
  }
}

function risksIn(row: Row): number {
  const risks = row.values[RISKS]
  return typeof risks === "number" && risks > ONE_RISK ? risks : ONE_RISK
}

export function luckIn(rows: readonly Row[]): number {
  let total = 0
  for (const row of rows) {
    const each = row.values[REJECTED] === true ? POINTS_FOR_A_NO : POINTS_FOR_A_RISK
    total += each * risksIn(row)
  }
  return total
}

export async function fetchLuckPoints(ask: Asking, from: string, to: string): Promise<number> {
  const asked = await ask(rejectionsBetween(from, to))
  if (!asked.ok) throw new Error(`${REJECTIONS_UNKNOWN}: ${asked.why}`)
  return luckIn(asked.rows)
}
