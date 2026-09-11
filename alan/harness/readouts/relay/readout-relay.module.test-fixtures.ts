import { RELAY_SECRET_HEADER } from "akasha/alan/harness/readouts/credential/readout-credential.module.code.ts"
import {
  holdRelayed,
  RELAY_PATH,
  relayReading,
} from "akasha/alan/harness/readouts/relay/readout-relay.module.code.ts"

export function carryTo(to: string, secret: string, body: unknown): Promise<Response> {
  return fetch(new URL(RELAY_PATH, to), {
    method: "POST",
    headers: { "Content-Type": "application/json", [RELAY_SECRET_HEADER]: secret },
    body: JSON.stringify(body),
  })
}

export function relayedFor(
  readout: string,
  value: number,
  at: Date = new Date(),
  fallsPerHour = 0
): undefined {
  holdRelayed({ readout, value, at: at.toISOString(), fallsPerHour })
}

export type Relaying = (
  readout: string,
  value: number,
  at?: Date
) => ReturnType<typeof relayReading>

export function relayingTo(origin: string, secret: string): Relaying {
  return (readout, value, at = new Date()) =>
    relayReading(origin, secret, { readout, value, at: at.toISOString(), fallsPerHour: 0 })
}

export type RelayingOne = (value: number, at?: Date) => ReturnType<typeof relayReading>

export function relayingOneTo(origin: string, secret: string, readout: string): RelayingOne {
  const carried = relayingTo(origin, secret)
  return (value, at = new Date()) => carried(readout, value, at)
}
