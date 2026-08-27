"use client"

import { type IconName, PASCAL_TO_KEBAB, resolveIconName } from "@shared/pages-core/icon"
import type { LucideIcon, LucideProps } from "lucide-react"
import { icons } from "lucide-react"

const KEBAB_TO_PASCAL: Record<string, string> = Object.fromEntries(
  Object.entries(PASCAL_TO_KEBAB).map(([pascal, kebab]) => [kebab, pascal])
)

const iconRegistry: Record<string, LucideIcon> = icons

function lookupLucide(name: IconName): LucideIcon | undefined {
  const pascal = KEBAB_TO_PASCAL[name]
  if (pascal == null) return undefined
  return iconRegistry[pascal]
}

interface IconProps extends Omit<LucideProps, "name"> {
  name: string | null | undefined
}

export function Icon({ name, ...props }: IconProps) {
  const resolved = resolveIconName(name)
  const Component = lookupLucide(resolved) ?? lookupLucide(resolveIconName("file-text"))
  if (!Component) return null
  return <Component {...props} />
}
