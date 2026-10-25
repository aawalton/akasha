"use client"

import { createContext, useContext } from "react"

const AppEditingContext = createContext<boolean>(true)

const AppCompletingContext = createContext<boolean>(true)

export function AppEditingProvider({
  editing,
  completing,
  children,
}: {
  readonly editing: boolean
  readonly completing?: boolean
  readonly children: React.ReactNode
}): React.ReactNode {
  return (
    <AppEditingContext value={editing}>
      <AppCompletingContext value={completing ?? editing}>{children}</AppCompletingContext>
    </AppEditingContext>
  )
}

export function useAppEditing(): boolean {
  return useContext(AppEditingContext)
}

export function useAppCompleting(): boolean {
  return useContext(AppCompletingContext)
}
