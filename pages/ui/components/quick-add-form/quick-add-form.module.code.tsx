"use client"

import { Badge, BadgeRow } from "@akasha/design-badges/badge"
import { BadgeLayoutProvider } from "@akasha/design-badges/badge-layout-context"
import { cn } from "@akasha/design-primitives/cn"
import { Input } from "@akasha/design-primitives/input"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { Textarea } from "@akasha/design-primitives/textarea"
import type { PropertyValue } from "@akasha/pages-core/property-types/types"
import type { ReadonlyJSONValue } from "@akasha/pages-core/schema/pages"
import type { QuickAddConfig } from "@akasha/pages-core/schema/quick-add"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import type { PageWithProperties } from "@akasha/pages-ui/supabase/page-with-properties"
import { SelectPropertyBadge } from "@akasha/pages-ui-components/select-property-badge"
import { useMemo, useRef, useState } from "react"
import { computeQuickAddPayload } from "../quick-add/compute-quick-add-payload/compute-quick-add-payload.module.code.ts"
import { parseInlineTokens } from "../quick-add/parse-inline-tokens/parse-inline-tokens.module.code.ts"
import {
  type InlineCompletionSource,
  useInlineCompletion,
} from "../quick-add/use-inline-completion/use-inline-completion.module.code.ts"

export interface QuickAddFormProps {
  readonly formId: string
  readonly quickAdd: QuickAddConfig
  readonly propertyDefinitions: readonly PropertyDefinition[]
  readonly existingPages: readonly PageWithProperties[]
  readonly disabled: boolean
  readonly onSubmit: (properties: Readonly<Record<string, ReadonlyJSONValue>>) => void
}

interface SuppressionState {
  readonly bySigil: Readonly<Record<string, readonly string[]>>
}

interface DismissedState {
  readonly bySigil: Readonly<Record<string, readonly string[]>>
}

function buildFrequencyMap(
  pages: readonly PageWithProperties[],
  propertyId: string
): { candidates: readonly string[]; frequency: ReadonlyMap<string, number> } {
  const frequency = new Map<string, number>()
  for (const p of pages) {
    const v = p.properties[propertyId]
    if (!Array.isArray(v)) continue
    for (const t of v) {
      if (typeof t !== "string") continue
      frequency.set(t, (frequency.get(t) ?? 0) + 1)
    }
  }
  return { candidates: Array.from(frequency.keys()), frequency }
}

function buildSources(
  config: QuickAddConfig,
  pages: readonly PageWithProperties[]
): readonly InlineCompletionSource[] {
  const out: InlineCompletionSource[] = []
  for (const slot of config.inlineTokens ?? []) {
    const auto = slot.autocompleteFrom
    if (auto === undefined) continue
    if (auto.kind === "literal") {
      out.push({ sigil: slot.sigil, candidates: auto.values })
      continue
    }
    const { candidates, frequency } = buildFrequencyMap(pages, slot.propertyId)
    out.push({ sigil: slot.sigil, candidates, frequency })
  }
  return out
}

export function QuickAddForm(props: QuickAddFormProps): React.ReactNode {
  const { formId, quickAdd, propertyDefinitions, existingPages, disabled, onSubmit } = props

  const [titleRaw, setTitleRaw] = useState("")
  const [notes, setNotes] = useState("")
  const [cursorPos, setCursorPos] = useState(0)
  const [suppression, setSuppression] = useState<SuppressionState>({ bySigil: {} })
  const [dismissed, setDismissed] = useState<DismissedState>({ bySigil: {} })
  const [pickerValues, setPickerValues] = useState<Readonly<Record<string, string>>>({})
  const inputRef = useRef<HTMLInputElement>(null)

  const sigils = useMemo<readonly string[]>(
    () => (quickAdd.inlineTokens ?? []).map((s) => s.sigil),
    [quickAdd.inlineTokens]
  )

  const rawParsed = useMemo(() => parseInlineTokens(titleRaw, sigils), [titleRaw, sigils])

  const parsedBySigilEffective = useMemo<Readonly<Record<string, readonly string[]>>>(() => {
    const out: Record<string, readonly string[]> = {}
    for (const [sigil, tokens] of Object.entries(rawParsed.parsedBySigil)) {
      const suppressed = suppression.bySigil[sigil] ?? []
      out[sigil] = tokens.filter((t) => !suppressed.includes(t))
    }
    return out
  }, [rawParsed, suppression])

  const cleanTitle = useMemo<string>(() => {
    let title = titleRaw
    for (const [sigil, tokens] of Object.entries(rawParsed.parsedBySigil)) {
      const suppressed = suppression.bySigil[sigil] ?? []
      const escaped = sigil.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      for (const tok of tokens) {
        if (suppressed.includes(tok)) continue
        title = title.replace(new RegExp(`${escaped}${tok}`, "gi"), "")
      }
    }
    return title.replace(/\s{2,}/g, " ").trim()
  }, [titleRaw, rawParsed, suppression])

  const completionSources = useMemo(
    () => buildSources(quickAdd, existingPages),
    [quickAdd, existingPages]
  )
  const { suggestion, accept } = useInlineCompletion({
    value: titleRaw,
    cursorPos,
    sources: completionSources,
  })

  const updateTitleRaw = (value: string) => {
    setTitleRaw(value)
    setSuppression({ bySigil: {} })
  }

  const handleCursorChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setCursorPos(e.currentTarget.selectionStart ?? titleRaw.length)
  }

  const handleSubmit = () => {
    if (cleanTitle.length === 0) return
    const payload = computeQuickAddPayload(quickAdd, {
      cleanTitle,
      notes,
      parsedBySigil: parsedBySigilEffective,
      dismissedDefaultsBySigil: dismissed.bySigil,
      pickerValues,
    })
    onSubmit(payload)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && suggestion !== null) {
      e.preventDefault()
      const newValue = accept()
      updateTitleRaw(newValue)
      requestAnimationFrame(() => {
        inputRef.current?.setSelectionRange(newValue.length, newValue.length)
      })
      return
    }
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const dismissParsed = (sigil: string, token: string) => {
    setSuppression((prev) => {
      const list = prev.bySigil[sigil] ?? []
      if (list.includes(token)) return prev
      return { bySigil: { ...prev.bySigil, [sigil]: [...list, token] } }
    })
  }

  const dismissDefault = (sigil: string, token: string) => {
    setDismissed((prev) => {
      const list = prev.bySigil[sigil] ?? []
      if (list.includes(token)) return prev
      return { bySigil: { ...prev.bySigil, [sigil]: [...list, token] } }
    })
  }

  const propertyDefinitionsById = useMemo<ReadonlyMap<string, PropertyDefinition>>(() => {
    const map = new Map<string, PropertyDefinition>()
    for (const def of propertyDefinitions) map.set(def.id, def)
    return map
  }, [propertyDefinitions])

  return (
    <form
      id={formId}
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <div className="flex flex-col gap-4">
        <div className={cn("relative rounded-md", surfaceClass(2))}>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-pre px-3 text-sm"
          >
            <span className="invisible">{titleRaw.slice(0, cursorPos)}</span>
            <span className="text-tertiary">{suggestion ?? ""}</span>
          </span>
          {}
          <Input
            ref={inputRef}
            className="relative z-10 bg-transparent"
            value={titleRaw}
            onChange={(e) => {
              updateTitleRaw(e.target.value)
              setCursorPos(e.target.selectionStart ?? e.target.value.length)
            }}
            onSelect={handleCursorChange}
            onKeyUp={handleCursorChange}
            onKeyDown={handleKeyDown}
            placeholder="Title..."
            autoFocus
            required
            disabled={disabled}
          />
        </div>
        <BadgeRow>
          {(quickAdd.inlineTokens ?? []).flatMap((slot) => {
            const parsedTokens = parsedBySigilEffective[slot.sigil] ?? []
            const dismissedDefaults = dismissed.bySigil[slot.sigil] ?? []
            const defaults = (slot.defaults ?? []).map((t) => t.toLowerCase())
            const activeDefaults = defaults.filter(
              (t) => !dismissedDefaults.includes(t) && !parsedTokens.includes(t)
            )
            const parsedChips = parsedTokens.map((token) => (
              <Badge
                key={`parsed-${slot.sigil}-${token}`}
                variant="accent"
                onRemove={() => dismissParsed(slot.sigil, token)}
                removeLabel={`Remove ${slot.sigil}${token}`}
              >
                {slot.sigil}
                {token}
              </Badge>
            ))
            const defaultChips = activeDefaults.map((token) => (
              <Badge
                key={`default-${slot.sigil}-${token}`}
                variant="elevation-muted"
                onRemove={() => dismissDefault(slot.sigil, token)}
                removeLabel={`Remove default ${slot.sigil}${token}`}
              >
                {slot.sigil}
                {token}
              </Badge>
            ))
            return [...parsedChips, ...defaultChips]
          })}
          {(quickAdd.pickers ?? []).map((picker) => {
            const def = propertyDefinitionsById.get(picker.propertyId)
            if (def === undefined || def.type !== "select") return null
            const override = pickerValues[picker.propertyId]
            const fallback = picker.defaultValue ?? ""
            const value: PropertyValue = override ?? fallback
            return (
              <BadgeLayoutProvider
                key={`picker-${picker.propertyId}`}
                truncate="fixed"
                popoverAlign="start"
              >
                <SelectPropertyBadge
                  property={def}
                  value={value}
                  context="card"
                  editable
                  onPropertyChange={(propertyId, v) => {
                    if (typeof v !== "string") return
                    setPickerValues((prev) => ({ ...prev, [propertyId]: v }))
                  }}
                />
              </BadgeLayoutProvider>
            )
          })}
        </BadgeRow>
        {quickAdd.notesPropertyId !== undefined && (
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onKeyDown={handleTextareaKeyDown}
            placeholder="What needs to be done?"
            rows={3}
            disabled={disabled}
          />
        )}
      </div>
    </form>
  )
}
