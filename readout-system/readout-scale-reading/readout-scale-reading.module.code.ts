import { askingFor, type Fetcher } from "@akasha/pages-system-service/calling"
import type { RingScale } from "../readout-body/readout-body.module.code.ts"
import { statedAt } from "../readout-tier/readout-tier.module.code.ts"

const READOUT_SCALE = "readout-scale"

export function scaleIn(values: Readonly<Record<string, unknown>>): RingScale | undefined {
  const orangeAt = statedAt(values.orangeAt)
  const redAt = statedAt(values.redAt)
  const blackAt = statedAt(values.blackAt)
  if (orangeAt === null || redAt === null || blackAt === null) return undefined

  const yellowAt = statedAt(values.yellowAt)
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
