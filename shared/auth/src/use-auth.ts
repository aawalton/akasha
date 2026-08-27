"use client"

import { createContext, useContext } from "react"

export interface AuthContextValue {
  userId: string | null
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextValue>({
  userId: null,
  isAuthenticated: false,
})

export function useAuth(): AuthContextValue {
  return useContext(AuthContext)
}
