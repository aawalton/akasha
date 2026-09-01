import { type ComponentType, Fragment, type ReactElement, useSyncExternalStore } from "react"

type HostEntry = {
  readonly id: string
  readonly component: ComponentType
}

const hosts = new Map<string, ComponentType>()
const listeners = new Set<() => void>()

function snapshotOf(): readonly HostEntry[] {
  return Array.from(hosts, ([id, component]) => ({ id, component }))
}

let entrySnapshot = snapshotOf()

function notify(): undefined {
  entrySnapshot = snapshotOf()
  for (const listener of listeners) listener()
}

export function registerCapabilityHost(id: string, component: ComponentType): undefined {
  hosts.set(id, component)
  notify()
}

export function unregisterCapabilityHost(id: string): undefined {
  hosts.delete(id)
  notify()
}

export function capabilityHostEntries(): readonly HostEntry[] {
  return entrySnapshot
}

function subscribe(listener: () => void): () => undefined {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function PagesUICapabilityHosts(): ReactElement {
  const entries = useSyncExternalStore(
    (onStoreChange) =>
      subscribe(() => {
        onStoreChange()
        return undefined
      }),
    capabilityHostEntries,
    capabilityHostEntries
  )
  return (
    <Fragment>
      {entries.map((entry) => (
        <entry.component key={entry.id} />
      ))}
    </Fragment>
  )
}
