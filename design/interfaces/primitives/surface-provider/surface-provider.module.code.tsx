"use client"

import * as React from "react"

import { cn } from "../cn/cn.module.code.ts"
import {
  clampSurfaceLevel,
  type SurfaceLevel,
  surfaceClass,
} from "../surface-class/surface-class.module.code.ts"

const SurfaceContext = React.createContext<SurfaceLevel>(0)

export function useSurface(): SurfaceLevel {
  return React.useContext(SurfaceContext)
}

export interface SurfaceProviderProps {
  level?: SurfaceLevel
  background?: boolean
  className?: string
  children: React.ReactNode
}

export function SurfaceProvider({
  level,
  background = true,
  className,
  children,
}: SurfaceProviderProps) {
  const parent = React.useContext(SurfaceContext)
  const resolved: SurfaceLevel = level ?? clampSurfaceLevel(parent + 1)

  type CSSPropsWithVars = React.CSSProperties & { [key: `--${string}`]: string | number }
  const style: CSSPropsWithVars = { "--surface-level": resolved }

  return (
    <SurfaceContext.Provider value={resolved}>
      <div
        data-surface={resolved}
        style={style}
        className={cn(!background && "contents", background && surfaceClass(resolved), className)}
      >
        {children}
      </div>
    </SurfaceContext.Provider>
  )
}
