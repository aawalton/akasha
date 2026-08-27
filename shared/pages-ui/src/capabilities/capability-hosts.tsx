import { type ComponentType, Fragment, type ReactElement, useSyncExternalStore } from "react"

const hosts = new Map<string, ComponentType>()
const listeners = new Set<() => void>()

let snapshot: readonly (readonly [string, ComponentType])[] = []

function recompute(): undefined {
  snapshot = Array.from(hosts.entries())
}

function notify(): undefined {
  recompute()
  for (const listener of listeners) listener()
}

export function registerCapabilityHost(id: string, Component: ComponentType): undefined {
  hosts.set(id, Component)
  notify()
}

export function unregisterCapabilityHost(id: string): undefined {
  hosts.delete(id)
  notify()
}

export function capabilityHostEntries(): readonly (readonly [string, ComponentType])[] {
  return snapshot
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function PagesUICapabilityHosts(): ReactElement {
  const entries = useSyncExternalStore(subscribe, capabilityHostEntries, capabilityHostEntries)
  return (
    <Fragment>
      {entries.map(([id, Component]) => (
        <Component key={id} />
      ))}
    </Fragment>
  )
}
