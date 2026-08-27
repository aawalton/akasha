"use client"

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react"
import {
  formatChord,
  type KeyBinding,
  type KeyBindingDescriptor,
  type KeyEventFacts,
  matchBindings,
  type OS,
  parseChord,
  selectBindingsById,
} from "../utils/keyboard-registry"

const STORAGE_KEY = "keyboard-shortcuts-enabled"

type Registration = Omit<KeyBinding, "enabled"> & { enabled: true }

const registrations = new Map<symbol, Registration>()
const scopeContainers = new Map<symbol, { element: Element; scopeId: string }>()
const subscribers = new Set<() => void>()

let listenerAttached = false
let cachedOs: OS | null = null
let enabledState: boolean | null = null
let descriptorCache: KeyBindingDescriptor[] | null = null

const EMPTY_DESCRIPTORS: readonly KeyBindingDescriptor[] = Object.freeze([])

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

function subscribe(callback: () => void): () => void {
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

function computeActiveScopes(): Set<string> {
  const active = new Set<string>()
  const focused = document.activeElement
  if (focused === null) return active
  for (const { element, scopeId } of scopeContainers.values()) {
    if (element.contains(focused)) active.add(scopeId)
  }
  return active
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
    activeScopes: computeActiveScopes(),
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
  if (listenerAttached || typeof document === "undefined") return
  document.addEventListener("keydown", handleKeyDown)
  listenerAttached = true
}

function detachListenerIfIdle(): undefined {
  if (listenerAttached && registrations.size === 0 && typeof document !== "undefined") {
    document.removeEventListener("keydown", handleKeyDown)
    listenerAttached = false
  }
}

function register(registration: Registration): () => void {
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

export function useKeyboardBinding(binding: KeyBinding): undefined {
  const onTriggerRef = useRef(binding.onTrigger)
  onTriggerRef.current = binding.onTrigger

  const { id, chord, label, scope, enabled, allowInTextInput, preventDefault, group, layer } =
    binding

  useEffect(() => {
    if (enabled === false) return
    return register({
      id,
      chord,
      label,
      scope,
      allowInTextInput,
      preventDefault,
      group,
      layer,
      enabled: true,
      onTrigger: () => onTriggerRef.current(),
    })
  }, [id, chord, label, scope, enabled, allowInTextInput, preventDefault, group, layer])
}

export function useKeyboardScope(scopeId: string): (element: Element | null) => void {
  const handleRef = useRef<symbol | null>(null)
  return useCallback(
    (element: Element | null) => {
      if (element !== null) {
        const handle = Symbol("keyboard-scope")
        handleRef.current = handle
        scopeContainers.set(handle, { element, scopeId })
      } else if (handleRef.current !== null) {
        scopeContainers.delete(handleRef.current)
        handleRef.current = null
      }
    },
    [scopeId]
  )
}

export function useShortcutsEnabled(): readonly [boolean, (enabled: boolean) => void] {
  const enabled = useSyncExternalStore(subscribe, getEnabled, () => true)
  return [enabled, setEnabled]
}

export function triggerBinding(id: string): undefined {
  const toTrigger = selectBindingsById(id, [...registrations.values()])
  for (const binding of toTrigger) binding.onTrigger()
}

function getDescriptors(): readonly KeyBindingDescriptor[] {
  if (descriptorCache === null) {
    const os = getOs()
    descriptorCache = [...registrations.values()].map((registration) => {
      const parsed = parseChord(registration.chord)
      return {
        id: registration.id,
        label: registration.label,
        chord: parsed,
        display: formatChord(parsed, os),
        group: registration.group,
        layer: registration.layer,
        scope: registration.scope,
      }
    })
  }
  return descriptorCache
}

export function useKeyboardBindings(): readonly KeyBindingDescriptor[] {
  return useSyncExternalStore(subscribe, getDescriptors, () => EMPTY_DESCRIPTORS)
}

export function __resetKeyboardRegistryForTest(): undefined {
  registrations.clear()
  scopeContainers.clear()
  subscribers.clear()
  if (listenerAttached && typeof document !== "undefined") {
    document.removeEventListener("keydown", handleKeyDown)
    listenerAttached = false
  }
  cachedOs = null
  enabledState = null
  descriptorCache = null
}
