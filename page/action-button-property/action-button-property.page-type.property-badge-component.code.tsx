"use client"

import {
  BadgeLayoutProvider,
  useBadgeLayoutContext,
} from "akasha/design/interface/badge/modules/badge-layout-context/badge-layout-context.module.code.tsx"
import { ButtonBadge } from "akasha/design/interface/badge/modules/button-badge/button-badge.module.code.tsx"
import { Icon } from "akasha/design/interface/pattern/modules/lucide-icon/lucide-icon.module.code.tsx"
import { actionButtonConfigSchema } from "akasha/page/core/schema/modules/action-button-config/action-button-config.module.code.ts"
import { parseConfig } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"
import {
  getActionVerb,
  getActionVerbPresentation,
} from "akasha/page/ui/modules/action-verb-registry/action-verb-registry.module.code.ts"
import { useSetPropertyOptimistic } from "akasha/page/ui/supabase/modules/use-set-property-optimistic/use-set-property-optimistic.module.code.tsx"
import { type MouseEvent, useEffect } from "react"

export function Drawing({ property, pageData, pageId, pageTypeSlug }: PropertyBadgeProps) {
  const config = parseConfig(actionButtonConfigSchema, property.config, { verbId: "" })
  const setProperty = useSetPropertyOptimistic()
  const layout = useBadgeLayoutContext()
  const baseDisabled =
    getActionVerb(config.verbId) === undefined || pageId == null || pageTypeSlug == null
  const overlay =
    getActionVerbPresentation(config.verbId)?.({
      pageId: pageId ?? "",
      pageTypeSlug: pageTypeSlug ?? "",
      data: pageData ?? {},
      verbId: config.verbId,
      config,
    }) ?? {}
  const label = overlay.label ?? config.label ?? property.title
  const disabled = baseDisabled || overlay.disabled === true
  const overlayIcon =
    typeof overlay.icon === "string" && overlay.icon !== "" ? (
      <Icon name={overlay.icon} />
    ) : undefined

  useEffect(() => {
    if (config.verbId !== "" && getActionVerb(config.verbId) === undefined) {
      console.error(
        `Drawing: no handler registered for verbId "${config.verbId}" (property ${property.id})`
      )
    }
  }, [config.verbId, property.id])

  const run = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()
    const handler = getActionVerb(config.verbId)
    if (handler === undefined || pageId == null || pageTypeSlug == null) {
      console.error(`Drawing: cannot fire verbId "${config.verbId}" (property ${property.id})`)
      return
    }
    if (config.confirm === true && !window.confirm(label)) return
    try {
      await Promise.resolve(
        handler({ pageId, pageTypeSlug, data: pageData ?? {}, verbId: config.verbId, config })
      )
    } catch (error) {
      console.error(`Drawing: verbId "${config.verbId}" handler failed`, error)
      return
    }
    if (config.recordInvokedAt === true) {
      void setProperty({
        pageTypeSlug,
        pageId,
        propertyId: property.id,
        value: { lastInvokedAt: new Date().toISOString() },
      })
    }
  }

  const button = (
    <ButtonBadge
      variant={config.badgeVariant ?? "accent"}
      disabled={disabled}
      onClick={(e) => {
        void run(e)
      }}
    >
      {label}
    </ButtonBadge>
  )

  if (overlayIcon === undefined) return button
  return (
    <BadgeLayoutProvider {...layout} icon={overlayIcon}>
      {button}
    </BadgeLayoutProvider>
  )
}
