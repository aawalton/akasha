"use client"

import { createContext, useContext } from "react"

export interface PanelToggleSignal {
  action: "expand-all" | "collapse-all"
  generation: number
}

export const PanelToggleContext = createContext<PanelToggleSignal>({
  action: "collapse-all",
  generation: 0,
})

export function usePanelToggle(): PanelToggleSignal {
  return useContext(PanelToggleContext)
}

export const PanelToggleLocalContext = createContext(false)

export function usePanelToggleIsLocal(): boolean {
  return useContext(PanelToggleLocalContext)
}
