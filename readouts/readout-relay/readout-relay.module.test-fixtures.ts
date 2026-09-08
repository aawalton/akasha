import { holdRelayed, relayReading } from "./readout-relay.module.code.ts"

export function relayedFor(readout: string, value: number, at: Date = new Date()): undefined {
  holdRelayed({ readout, value, at: at.toISOString() })
}

export type Relaying = (
  readout: string,
  value: number,
  at?: Date
) => ReturnType<typeof relayReading>

export function relayingTo(origin: string, secret: string): Relaying {
  return (readout, value, at = new Date()) =>
    relayReading(origin, secret, { readout, value, at: at.toISOString() })
}
