"use client"

import { useEffect, useState } from "react"
import "akasha/code/editor/extension/vscode-api/vscode-api.type-declaration.d.ts"

export function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(false)
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return
    const mq = window.matchMedia("(pointer: coarse)")
    setCoarse(mq.matches)
    const onChange = () => setCoarse(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])
  return coarse
}
