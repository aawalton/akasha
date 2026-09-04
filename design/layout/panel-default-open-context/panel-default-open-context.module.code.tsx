"use client"

import { createContext, use } from "react"

const PanelDefaultOpenContext = createContext<boolean | null>(null)

export const PanelDefaultOpenProvider = PanelDefaultOpenContext.Provider

export function usePanelDefaultOpen(): boolean | null {
  return use(PanelDefaultOpenContext)
}

export const PanelSummaryContext = createContext(false)

export const PanelSummaryProvider = PanelSummaryContext.Provider

export function usePanelIsSummary(): boolean {
  return use(PanelSummaryContext)
}
