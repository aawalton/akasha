"use client"

import { createContext, useContext, useMemo } from "react"

type Creating = () => void | Promise<void>

type CreateOverrides = Readonly<Record<string, Creating>>

const NONE: CreateOverrides = {}

const CreateOverrideContext = createContext<CreateOverrides>(NONE)

export function CreateOverrideProvider({
  overrides,
  children,
}: {
  readonly overrides: CreateOverrides
  readonly children: React.ReactNode
}): React.ReactNode {
  const held = useMemo(() => overrides, [overrides])
  return <CreateOverrideContext value={held}>{children}</CreateOverrideContext>
}

export function useCreateOverride(pageTypeSlug: string | undefined): Creating | undefined {
  const overrides = useContext(CreateOverrideContext)
  if (pageTypeSlug === undefined) return undefined
  return overrides[pageTypeSlug]
}
