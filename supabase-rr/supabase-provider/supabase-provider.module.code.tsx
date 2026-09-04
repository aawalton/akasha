"use client"

import { createContext, type ReactNode, useContext, useMemo } from "react"
import {
  getBrowserClient,
  type SupabaseBrowserClient,
} from "../browser-client/browser-client.module.code.ts"

const SupabaseContext = createContext<SupabaseBrowserClient | null>(null)

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => getBrowserClient(), [])
  return <SupabaseContext.Provider value={client}>{children}</SupabaseContext.Provider>
}

export function useSupabase(): SupabaseBrowserClient {
  const client = useContext(SupabaseContext)
  if (!client) {
    throw new Error("useSupabase: must be used inside <SupabaseProvider>")
  }
  return client
}
