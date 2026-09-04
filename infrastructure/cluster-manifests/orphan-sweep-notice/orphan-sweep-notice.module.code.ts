import type { LiveResource } from "../orphan-resource-listing/orphan-resource-listing.module.code.ts"

export const HANDLER = "dalla"

export const SENDER = "orphaned-resources-sweep"

export interface SweepReading {
  readonly ranOk: boolean
  readonly orphans: readonly LiveResource[]
  readonly liveCount: number
  readonly namespaceCount: number
  readonly failureDetail: string | null
}

export type SweepSignal =
  | { readonly kind: "silent" }
  | { readonly kind: "alert"; readonly text: string }
  | { readonly kind: "could-not-run"; readonly detail: string }

export function named(one: LiveResource): string {
  return `${one.kind}/${one.namespace}/${one.name} (managed-by=${one.managedBy ?? "?"})`
}

function alertText(reading: SweepReading): string {
  const list = reading.orphans.map(named).join(", ")
  return (
    `The daily orphaned-resources sweep found ${reading.orphans.length} orphan(s) — ${list}. ` +
    "Each is a live resource a deploy manages that no `synth.ts` accounts for, so what is " +
    "running has parted from what the code says should run. Put it right by taking the orphan " +
    `away or restoring its source. ${reading.liveCount} live resource(s) were read across ` +
    `${reading.namespaceCount} app namespace(s). The whole run stands in ` +
    "`journalctl --user -u orphaned-resources-sweep` on the workstation."
  )
}

export function decideSweepSignal(reading: SweepReading): SweepSignal {
  if (!reading.ranOk) {
    return {
      kind: "could-not-run",
      detail:
        reading.failureDetail ??
        "the sweep did not finish, so there is no drift result to act on and this is said as a " +
          "failed run rather than as a message",
    }
  }
  if (reading.orphans.length === 0) return { kind: "silent" }
  return { kind: "alert", text: alertText(reading) }
}
