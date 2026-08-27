"use client"

import { useLayoutContext } from "./layout-context"

export function useColumnCount(): number | null {
  const layoutContext = useLayoutContext()
  return layoutContext?.columnCount ?? null
}
