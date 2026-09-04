import { holdRelayed } from "./readout-relay.module.code.ts"

export function relayedFor(readout: string, value: number, at: Date = new Date()): undefined {
  holdRelayed({ readout, value, at: at.toISOString() })
}
