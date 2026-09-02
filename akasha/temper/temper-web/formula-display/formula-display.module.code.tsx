"use client"

import { cn } from "@akasha/design-primitives/cn"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { toLatex } from "@akasha/temper-formula-framework/display-formula-latex"
import type { DisplayFormulaNode } from "@akasha/temper-formula-framework/display-formula-node"
import katex from "katex"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"

interface ActiveLabel {
  label: string
  rect: DOMRect
}

interface FormulaDisplayProps {
  formula: DisplayFormulaNode
  displayMode?: "block" | "inline"
  className?: string
}

export function FormulaDisplay({ formula, displayMode = "block", className }: FormulaDisplayProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [activeLabel, setActiveLabel] = useState<ActiveLabel | null>(null)

  const html = useMemo(() => {
    const latex = toLatex(formula)
    return katex.renderToString(latex, {
      displayMode: displayMode === "block",
      throwOnError: false,
      trust: true,
    })
  }, [formula, displayMode])

  const handleClick = useCallback((e: MouseEvent) => {
    if (!(e.target instanceof HTMLElement)) return
    const target = e.target.closest<HTMLElement>("[data-label]")
    if (!target || !containerRef.current?.contains(target)) return
    e.stopPropagation()
    const rawLabel = target.dataset.label
    if (rawLabel == null) return
    const label = rawLabel.replaceAll("\uFF0C", ",")
    setActiveLabel({ label, rect: target.getBoundingClientRect() })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("click", handleClick)
    return () => container.removeEventListener("click", handleClick)
  }, [handleClick])

  useEffect(() => {
    if (!activeLabel) return
    const dismiss = () => setActiveLabel(null)
    window.addEventListener("click", dismiss)
    window.addEventListener("scroll", dismiss, true)
    return () => {
      window.removeEventListener("click", dismiss)
      window.removeEventListener("scroll", dismiss, true)
    }
  }, [activeLabel])

  return (
    <>
      <span
        ref={containerRef}
        data-slot="formula-display"
        className={cn(displayMode === "block" && "block text-center", className)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {activeLabel && <LabelPopover label={activeLabel.label} rect={activeLabel.rect} />}
    </>
  )
}

function LabelPopover({ label, rect }: ActiveLabel) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const el = popoverRef.current
    if (!el) return
    const popoverRect = el.getBoundingClientRect()
    let left = rect.left + rect.width / 2 - popoverRect.width / 2
    left = Math.max(8, Math.min(left, window.innerWidth - popoverRect.width - 8))
    setOffset({ top: rect.top - popoverRect.height - 6, left })
  }, [rect])

  return createPortal(
    <div
      ref={popoverRef}
      className={cn(
        "pointer-events-none fixed z-50 rounded-md px-3 py-1.5 text-secondary text-sm shadow-md",
        surfaceClass(3)
      )}
      style={{ top: offset.top, left: offset.left }}
    >
      {label}
    </div>,
    document.body
  )
}
