"use client"

import { useLayoutPathname } from "@akasha/design-layout/router-context"
import { useCallback, useDeferredValue, useEffect, useRef, useState } from "react"
import { z } from "zod"
import {
  buildValuesFromFields,
  type FilterField,
} from "../build-values-from-fields/build-values-from-fields.module.code.ts"

const STORED_FILTERS_SCHEMA = z.record(z.string(), z.unknown())

type Fields<V> = { [K in keyof V]-?: FilterField<V[K]> }

function defaultToParam(value: unknown): string | null {
  if (value === null || value === undefined || value === "") return null
  if (Array.isArray(value)) return value.length > 0 ? value.join(",") : null
  return String(value)
}

function callFieldToParam<T>(field: FilterField<T>, value: T): string | null {
  if (field.toParam) {
    return field.toParam(value)
  }
  return defaultToParam(value)
}

export function useFilterPersistence<V extends Record<string, unknown>>(config: {
  storageKey: string
  fields: Fields<V>
  enabled?: boolean
}): {
  values: V
  deferred: V
  update: (partial: Partial<V>, options?: { push?: boolean }) => void
  isHydrated: boolean
} {
  const { storageKey, enabled = true } = config
  const fields = config.fields
  const pathname = useLayoutPathname()
  const enabledRef = useRef(enabled)
  const prevEnabledRef = useRef(enabled)
  enabledRef.current = enabled

  const hasUrlParams = Object.values(fields).some(
    (field) => field.urlParam !== undefined && field.initial !== undefined
  )

  const [values, setValues] = useState<V>(() =>
    buildValuesFromFields<V>(fields, (k) => fields[k].initial)
  )
  const [isHydrated, setIsHydrated] = useState(hasUrlParams)

  const fieldsRef = useRef(fields)
  fieldsRef.current = fields
  const storageKeyRef = useRef(storageKey)
  storageKeyRef.current = storageKey
  const pushNextRef = useRef(false)
  const isPopStateRef = useRef(false)

  useEffect(() => {
    if (hasUrlParams) return

    try {
      const stored = localStorage.getItem(storageKey)
      if (stored != null) {
        const parsed = STORED_FILTERS_SCHEMA.parse(JSON.parse(stored))
        setValues(buildValuesFromFields<V>(fields, (k) => parsed[k]))
      }
    } catch {}
    setIsHydrated(true)
  }, [hasUrlParams, pathname, storageKey])

  useEffect(() => {
    if (!isHydrated) return

    try {
      localStorage.setItem(storageKeyRef.current, JSON.stringify(values))
    } catch {}

    if (!enabled) return

    const currentFields = fieldsRef.current
    const params = new URLSearchParams()
    for (const key in currentFields) {
      const field = currentFields[key]
      if (field.urlParam == null) continue
      const serialized = callFieldToParam(field, values[key])
      if (serialized !== null) {
        params.set(field.urlParam, serialized)
      }
    }
    const queryString = params.toString()
    const url = queryString !== "" ? `${pathname}?${queryString}` : pathname

    const justEnabled = enabled && !prevEnabledRef.current
    prevEnabledRef.current = enabled

    if (isPopStateRef.current) {
      isPopStateRef.current = false
    } else if (justEnabled) {
      window.history.replaceState(null, "", url)
    } else if (pushNextRef.current) {
      pushNextRef.current = false
      window.history.pushState(null, "", url)
    } else {
      window.history.replaceState(null, "", url)
    }
  }, [values, isHydrated, pathname, enabled])

  useEffect(() => {
    if (!enabled) return

    const handlePopState = () => {
      const currentFields = fieldsRef.current
      const params = new URLSearchParams(window.location.search)
      const restored = buildValuesFromFields<V>(currentFields, (k) => {
        const field = currentFields[k]
        if (field.urlParam == null) return undefined
        return params.get(field.urlParam) ?? undefined
      })

      isPopStateRef.current = true
      setValues(restored)
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [enabled])

  const update = useCallback((partial: Partial<V>, options?: { push?: boolean }) => {
    if (options?.push) pushNextRef.current = true
    setValues((prev) => ({ ...prev, ...partial }))
  }, [])

  const deferred = useDeferredValue(values)

  return { values, deferred, update, isHydrated }
}
