import { askingFor, type Fetcher } from "@akasha/pages-system-service/calling"
import type { RingScale } from "../readout-body/readout-body.module.code.ts"

const READOUT_SCALE = "readout-scale"

export function declaredThreshold(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  if (trimmed.length === 0) return null
  const parsed = Number(trimmed)
  return Number.isFinite(parsed) ? parsed : null
}

export function scaleIn(values: Readonly<Record<string, unknown>>): RingScale | undefined {
  const orangeAt = declaredThreshold(values.orangeAt)
  const redAt = declaredThreshold(values.redAt)
  const blackAt = declaredThreshold(values.blackAt)
  if (orangeAt === null || redAt === null || blackAt === null) return undefined

  const yellowAt = declaredThreshold(values.yellowAt)
  return { orangeAt, redAt, blackAt, ...(yellowAt === null ? {} : { yellowAt }) }
}

export async function readScale(
  scaleSlug: string,
  fetcher?: Fetcher
): Promise<RingScale | undefined> {
  const asked = await askingFor(
    { pageTypeSlug: READOUT_SCALE, where: { slug: { is: scaleSlug } } },
    fetcher
  )
  if ("refused" in asked) return undefined

  const [row] = asked.rows
  if (row === undefined) return undefined
  return scaleIn(row)
}
