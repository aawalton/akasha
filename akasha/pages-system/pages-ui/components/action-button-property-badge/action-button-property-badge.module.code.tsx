"use client"

import {
  BadgeLayoutProvider,
  useBadgeLayoutContext,
} from "@akasha/design-badges/badge-layout-context"
import { ButtonBadge } from "@akasha/design-badges/button-badge"
import { Icon } from "@akasha/design-patterns/lucide-icon"
import { actionButtonConfigSchema } from "@akasha/pages-core/schema/action-button-config"
import { parseConfig } from "@akasha/pages-core/schema/pages"
import {
  getActionVerb,
  getActionVerbPresentation,
} from "@akasha/pages-ui/action-verbs/action-verb-registry"
import { useSetPropertyOptimistic } from "@akasha/pages-ui/supabase/use-set-property-optimistic"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"
import { type MouseEvent, useEffect } from "react"

export function ActionButtonPropertyBadge({
  property,
  pageData,
  pageId,
  pageTypeSlug,
}: PropertyBadgeProps) {
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
        `ActionButtonPropertyBadge: no handler registered for verbId "${config.verbId}" (property ${property.id})`
      )
    }
  }, [config.verbId, property.id])

  const run = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()
    const handler = getActionVerb(config.verbId)
    if (handler === undefined || pageId == null || pageTypeSlug == null) {
      console.error(
        `ActionButtonPropertyBadge: cannot fire verbId "${config.verbId}" (property ${property.id})`
      )
      return
    }
    if (config.confirm === true && !window.confirm(label)) return
    try {
      await Promise.resolve(
        handler({ pageId, pageTypeSlug, data: pageData ?? {}, verbId: config.verbId, config })
      )
    } catch (error) {
      console.error(`ActionButtonPropertyBadge: verbId "${config.verbId}" handler failed`, error)
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
      variant={config.badgeVariant}
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
