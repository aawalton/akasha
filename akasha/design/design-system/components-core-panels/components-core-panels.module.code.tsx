"use client"

import { Badge } from "@akasha/design-badges/badge"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { Button } from "@akasha/design-primitives/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@akasha/design-primitives/card"
import { Heading } from "@akasha/design-primitives/heading"

const BUTTON_VARIANTS = ["primary", "secondary", "tertiary", "destructive", "accent"] as const
const BUTTON_SIZES = ["sm", "default", "lg", "icon-sm", "icon", "icon-lg"] as const
const BADGE_VARIANTS = ["accent", "destructive", "elevation", "elevation-muted", "surface"] as const

const QUALITY_BADGE_VARIANTS = [
  "normal",
  "fine",
  "superior",
  "epic",
  "legendary",
  "mythic",
  "radiant",
] as const

export function ComponentsCorePanels() {
  return (
    <>
      {}
      <PanelCard id="ds-buttons" collapsible title="Buttons">
        <div className="space-y-4">
          {BUTTON_VARIANTS.map((variant) => (
            <div key={variant} className="flex items-center gap-3">
              <span className="w-24 text-secondary text-sm">{variant}</span>
              <Button variant={variant}>Button</Button>
              <Button variant={variant} disabled>
                Disabled
              </Button>
            </div>
          ))}
          <div className="space-y-3 border-white/10 border-t pt-4">
            <Heading>Sizes</Heading>
            <div className="flex flex-wrap items-center gap-2">
              {BUTTON_SIZES.filter((s) => !s.startsWith("icon")).map((size) => (
                <Button key={size} variant="secondary" size={size}>
                  {size}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-badges" collapsible title="Badges">
        <div className="flex flex-wrap gap-2">
          {BADGE_VARIANTS.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-quality-badges" collapsible title="Quality Badges">
        <p className="text-secondary text-sm">
          ESO item quality badges. Use these when displaying item rarity.
        </p>
        <div className="flex flex-wrap gap-2">
          {QUALITY_BADGE_VARIANTS.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-removable-badges" collapsible title="Removable Badges">
        <p className="text-secondary text-sm">
          Badges with a dismiss button. Use <code>onRemove</code> for simple dismiss.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="accent" onRemove={() => {}}>
            onRemove only
          </Badge>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-cards" collapsible title="Cards">
        <Card>
          <CardHeader className="flex-col items-stretch">
            <CardTitle>Card Title</CardTitle>
            <CardDescription>
              Cards use surface-1 background with rounded-xl radius.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-secondary text-sm">
              Content inside cards. Nested elevated elements should use surface-2.
            </p>
            <div className="flex gap-2">
              <Badge variant="elevation">surface-2 badge</Badge>
            </div>
          </CardContent>
        </Card>
      </PanelCard>
    </>
  )
}
