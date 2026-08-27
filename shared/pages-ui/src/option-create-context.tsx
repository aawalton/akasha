"use client"

import { createContext, type ReactNode, useContext } from "react"

export type CreateSelectOptionEffect = (args: {
  definitionId: string
  label: string
}) => Promise<{ id: string; label: string }>

const PagesUIOptionCreateContext = createContext<CreateSelectOptionEffect | null>(null)

export function PagesUIOptionCreateProvider({
  value,
  children,
}: {
  value: CreateSelectOptionEffect
  children: ReactNode
}) {
  return (
    <PagesUIOptionCreateContext.Provider value={value}>
      {children}
    </PagesUIOptionCreateContext.Provider>
  )
}

export function useHostCreateSelectOption(): CreateSelectOptionEffect | null {
  return useContext(PagesUIOptionCreateContext)
}
