"use client"

import { createContext, useContext } from "react"

export const UserIdContext = createContext<string | null>(null)

export function useUserId(): string | null {
  return useContext(UserIdContext)
}
