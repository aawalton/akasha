import { z } from "zod"

import { RELAY_SECRET_HEADER } from "../../../akasha/readout-system/readout-credential/readout-credential.module.code.ts"
import type { RingCounts } from "../../../akasha/readout-system/readout/readouts/monarch-unreviewed-transactions/monarch-unreviewed-transactions.readout.code.ts"

const absentSecretSendsNoHeader = (value: string | undefined) =>
  value === undefined || value === "" ? undefined : value

const relaySecret = z.string().trim().optional().transform(absentSecretSendsNoHeader)

export async function fetchRingCountsFromRoute(
  url: string,
  timeoutMs = 10_000,
  credential = relaySecret.parse(process.env.SMILINGJENNY_RELAY_SECRET)
): Promise<RingCounts> {
  const headers: Record<string, string> = { Accept: "application/json" }
  if (credential !== undefined) {
    headers[RELAY_SECRET_HEADER] = credential
  }
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(timeoutMs) })
  if (!response.ok) {
    throw new Error(`${url} answered ${response.status} for the ring counts`)
  }
  const parsed = relayedCounts.safeParse(await response.json())
  if (!parsed.success) {
    throw new Error(`${url} answered no set of whole counts, so there is no reading to relay`)
  }
  return parsed.data
}

const relayedScale = z.object({
  yellowAt: z.number().int().nonnegative().optional(),
  orangeAt: z.number().int().nonnegative(),
  redAt: z.number().int().nonnegative(),
  blackAt: z.number().int().nonnegative(),
})

const relayedCounts = z.object({
  unreviewed: z.number().int().nonnegative(),
  scale: relayedScale.optional(),
  noneLeftWords: z.string().optional(),
  noneLeftEmoji: z.string().optional(),
})
