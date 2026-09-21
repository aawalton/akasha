"use client"

import { createContext, useContext } from "react"

const AppEditingContext = createContext<boolean>(true)

export function AppEditingProvider({
  editing,
  children,
}: {
  readonly editing: boolean
  readonly children: React.ReactNode
}): React.ReactNode {
  return <AppEditingContext value={editing}>{children}</AppEditingContext>
}

export function useAppEditing(): boolean {
  return useContext(AppEditingContext)
}
