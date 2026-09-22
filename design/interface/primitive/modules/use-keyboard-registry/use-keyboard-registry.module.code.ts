"use client"

import {
  describeBindings,
  type KeyBinding,
  type KeyBindingDescriptor,
  type KeyEventFacts,
  matchBindings,
  type OS,
  selectBindingsById,
} from "akasha/design/interface/primitive/modules/keyboard-registry/keyboard-registry.module.code.ts"
import { useEffect, useRef, useSyncExternalStore } from "react"

const STORAGE_KEY = "keyboard-shortcuts-enabled"

type Registration = Omit<KeyBinding, "enabled"> & { enabled: true }

const registrations = new Map<symbol, Registration>()
type StoreListener = Parameters<Parameters<typeof useSyncExternalStore>[0]>[0]

const subscribers = new Set<StoreListener>()

let LISTENER_ATTACHED = false
let cachedOs: OS | null = null
let enabledState: boolean | null = null
let descriptorCache: KeyBindingDescriptor[] | null = null

const EMPTY_DESCRIPTORS: readonly KeyBindingDescriptor[] = Object.freeze([])

const NO_SCOPES = new Set<string>()

function detectOs(): OS {
  if (typeof navigator === "undefined") return "other"
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? "mac" : "other"
}

function getOs(): OS {
  if (cachedOs === null) cachedOs = detectOs()
  return cachedOs
}

function getEnabled(): boolean {
  if (enabledState === null) {
    try {
      enabledState = localStorage.getItem(STORAGE_KEY) !== "false"
    } catch {
      enabledState = true
    }
  }
  return enabledState
}

function notify(): undefined {
  descriptorCache = null
  for (const callback of subscribers) callback()
}

function setEnabled(next: boolean): undefined {
  enabledState = next
  try {
    localStorage.setItem(STORAGE_KEY, String(next))
  } catch {}
  notify()
}

function subscribe(callback: StoreListener) {
  subscribers.add(callback)
  return () => {
    subscribers.delete(callback)
  }
}

function isTextInput(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable
}

function toFacts(event: KeyboardEvent): KeyEventFacts {
  return {
    key: event.key,
    code: event.code,
    metaKey: event.metaKey,
    ctrlKey: event.ctrlKey,
    altKey: event.altKey,
    shiftKey: event.shiftKey,
    inTextInput: isTextInput(event.target),
  }
}

function handleKeyDown(event: KeyboardEvent): undefined {
  const matched = matchBindings(toFacts(event), [...registrations.values()], {
    os: getOs(),
    shortcutsEnabled: getEnabled(),
    activeScopes: NO_SCOPES,
  })
  if (matched.length === 0) return
  let prevented = false
  for (const binding of matched) {
    if (binding.preventDefault !== false && !prevented) {
      event.preventDefault()
      prevented = true
    }
    binding.onTrigger()
  }
}

function ensureListener(): undefined {
  if (LISTENER_ATTACHED || typeof document === "undefined") return
  document.addEventListener("keydown", handleKeyDown)
  LISTENER_ATTACHED = true
}

function detachListenerIfIdle(): undefined {
  if (LISTENER_ATTACHED && registrations.size === 0 && typeof document !== "undefined") {
    document.removeEventListener("keydown", handleKeyDown)
    LISTENER_ATTACHED = false
  }
}

function register(registration: Registration): () => undefined {
  const handle = Symbol("keyboard-binding")
  registrations.set(handle, registration)
  ensureListener()
  notify()
  return () => {
    registrations.delete(handle)
    detachListenerIfIdle()
    notify()
  }
}

function shapeOf(bindings: readonly KeyBinding[]): string {
  return JSON.stringify(
    bindings.map((one) => [
      one.id,
      one.chord,
      one.label,
      one.scope,
      one.enabled,
      one.allowInTextInput,
      one.preventDefault,
      one.group,
      one.layer,
    ])
  )
}

export function useKeyboardBindings(bindings: readonly KeyBinding[]): undefined {
  const bindingsRef = useRef(bindings)
  bindingsRef.current = bindings
  const shape = shapeOf(bindings)

  useEffect(() => {
    const undoing = bindingsRef.current
      .filter((one) => one.enabled !== false)
      .map((one) =>
        register({
          id: one.id,
          chord: one.chord,
          label: one.label,
          scope: one.scope,
          allowInTextInput: one.allowInTextInput,
          preventDefault: one.preventDefault,
          group: one.group,
          layer: one.layer,
          enabled: true,
          onTrigger: () => {
            const latest = bindingsRef.current.find((other) => other.id === one.id)
            if (latest !== undefined) latest.onTrigger()
          },
        })
      )
    return () => {
      for (const undo of undoing) undo()
    }
  }, [shape])
}

export function useKeyboardBinding(binding: KeyBinding): undefined {
  useKeyboardBindings([binding])
}

export function useShortcutsEnabled(): readonly [boolean, (enabled: boolean) => undefined] {
  const enabled = useSyncExternalStore(subscribe, getEnabled, () => true)
  return [enabled, setEnabled]
}

export function triggerBinding(id: string): undefined {
  const toTrigger = selectBindingsById(id, [...registrations.values()])
  for (const binding of toTrigger) binding.onTrigger()
}

function getDescriptors(): readonly KeyBindingDescriptor[] {
  if (descriptorCache === null) {
    descriptorCache = [...describeBindings([...registrations.values()], getOs())]
  }
  return descriptorCache
}

export function useKeyboardBindingDescriptors(): readonly KeyBindingDescriptor[] {
  return useSyncExternalStore(subscribe, getDescriptors, () => EMPTY_DESCRIPTORS)
}
