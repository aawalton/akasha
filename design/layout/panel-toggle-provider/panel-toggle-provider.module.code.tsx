"use client"

import { useKeyboardBinding } from "@akasha/design-primitives/use-keyboard-registry"
import { useCallback, useState } from "react"
import {
  PanelToggleContext,
  type PanelToggleSignal,
} from "../panel-toggle-context/panel-toggle-context.module.code.tsx"

export function PanelToggleProvider({
  children,
  active = true,
}: {
  children: React.ReactNode
  active?: boolean
}) {
  const [signal, setSignal] = useState<PanelToggleSignal>({
    action: "collapse-all",
    generation: 0,
  })
  const handleToggle = useCallback((): undefined => {
    if (!active) return
    const openPanels = document.querySelectorAll(
      '[data-global-toggle][data-state="open"]:not([inert] *)'
    )
    const anyOpen = Array.from(openPanels).some(
      (el) => el instanceof HTMLElement && el.checkVisibility()
    )
    const next = anyOpen ? "collapse-all" : "expand-all"
    setSignal((prev) => ({ action: next, generation: prev.generation + 1 }))
  }, [active])

  useKeyboardBinding({
    id: "panel.toggle-all",
    chord: "Mod+Alt+T",
    label: "Expand / collapse all panels",
    enabled: active,
    onTrigger: handleToggle,
  })

  return <PanelToggleContext value={signal}>{children}</PanelToggleContext>
}
