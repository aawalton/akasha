"use client"

import type { ColorRuleVariant } from "@akasha/pages-core/schema/color-rule"
import { createContext, useContext } from "react"

export interface PageResolverEntry {
  id: string
  title: string
  color?: ColorRuleVariant
  sortOrder?: number
  createdAt?: number
}

export interface PageResolverValue {
  resolve: (id: string) => PageResolverEntry | null
  listPages: (pageTypeId?: string) => readonly { id: string; title: string }[]
}

const PageResolverContext = createContext<PageResolverValue | null>(null)

export function usePageResolverOptional(): PageResolverValue | null {
  return useContext(PageResolverContext)
}

export function PageResolverProvider({
  value,
  children,
}: {
  value: PageResolverValue
  children: React.ReactNode
}) {
  return <PageResolverContext.Provider value={value}>{children}</PageResolverContext.Provider>
}
