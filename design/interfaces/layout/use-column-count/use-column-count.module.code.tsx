"use client"

import { useLayoutContext } from "akasha/design/interfaces/layout/layout-context/layout-context.module.code.tsx"

export function useColumnCount(): number | null {
  const layoutContext = useLayoutContext()
  return layoutContext?.columnCount ?? null
}
