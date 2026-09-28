"use client"

import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import type * as React from "react"
import { useCallback, useRef } from "react"

type EnterPressed = {
  readonly key: string
  readonly shiftKey: boolean
  readonly nativeEvent: { readonly isComposing: boolean }
}

function sendsNow(event: EnterPressed): boolean {
  return event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing
}

const RETURN_SENDS = "[return-sends]"

const BREAK = "\n"

type LineAsked = { readonly inputType: string; readonly data: string | null }

function breaksLine(asked: LineAsked): boolean {
  if (asked.inputType === "insertLineBreak" || asked.inputType === "insertParagraph") return true
  return asked.inputType === "insertText" && asked.data === BREAK
}

function useReturnSends(
  send: () => void
): (textarea: HTMLTextAreaElement | null) => (() => void) | undefined {
  const latest = useRef(send)
  latest.current = send
  return useCallback((textarea: HTMLTextAreaElement | null) => {
    if (textarea === null) return undefined
    let shifted = false
    const onKeyDown = (event: KeyboardEvent) => {
      shifted = event.shiftKey
      console.info(RETURN_SENDS, "keydown", event.key, event.keyCode, event.isComposing)
    }
    const onBeforeInput = (event: InputEvent) => {
      console.info(RETURN_SENDS, "beforeinput", event.inputType, event.cancelable, event.data)
      if (shifted || !breaksLine(event) || !event.cancelable) return
      event.preventDefault()
      latest.current()
    }
    const onInput = (event: Event) => {
      if (!(event instanceof InputEvent)) return
      console.info(RETURN_SENDS, "input", event.inputType, event.data)
      if (shifted || !breaksLine(event)) return
      const caret = textarea.selectionStart
      const value = textarea.value
      if (caret < 1 || value[caret - 1] !== BREAK) return
      textarea.value = `${value.slice(0, caret - 1)}${value.slice(caret)}`
      textarea.setSelectionRange(caret - 1, caret - 1)
      setTimeout(() => latest.current(), 0)
    }
    textarea.addEventListener("keydown", onKeyDown)
    textarea.addEventListener("beforeinput", onBeforeInput)
    textarea.addEventListener("input", onInput)
    return () => {
      textarea.removeEventListener("keydown", onKeyDown)
      textarea.removeEventListener("beforeinput", onBeforeInput)
      textarea.removeEventListener("input", onInput)
    }
  }, [])
}

function Textarea({ className, autoComplete = "off", ...props }: React.ComponentProps<"textarea">) {
  const surface = useSurface()

  return (
    <textarea
      data-slot="textarea"
      autoComplete={autoComplete}
      {...(autoComplete === "off" && {
        "data-1p-ignore": true,
        "data-lpignore": "true",
        "data-form-type": "other",
      })}
      className={cn(
        `field-sizing-content flex min-h-16 w-full rounded-md ${surfaceClass(surface + 1)} px-3 py-2 text-base shadow-xs outline-none transition-[color,box-shadow] placeholder:text-tertiary disabled:cursor-not-allowed disabled:opacity-[0.38] aria-invalid:ring-secondary/30 md:text-sm focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]`,
        className
      )}
      {...props}
    />
  )
}

export { breaksLine, sendsNow, Textarea, useReturnSends }
