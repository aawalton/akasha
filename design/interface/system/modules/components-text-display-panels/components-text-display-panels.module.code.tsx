"use client"

import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { Kbd, KbdGroup } from "akasha/design/interface/pattern/modules/kbd/kbd.module.code.tsx"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "akasha/design/interface/primitive/modules/alert/alert.module.code.tsx"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "akasha/design/interface/primitive/modules/avatar/avatar.module.code.tsx"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "akasha/design/interface/primitive/modules/breadcrumb/breadcrumb.module.code.tsx"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import { Separator } from "akasha/design/interface/primitive/modules/separator/separator.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"

const TEXT_VARIANTS = ["description", "hint", "caption", "prose"] as const

export function TextPanel() {
  return (
    <PanelCard id="ds-text" collapsible title="Text">
      <div className="space-y-4">
        {TEXT_VARIANTS.map((variant) => (
          <div key={variant} className="space-y-1">
            <span className="text-secondary text-xs">{variant}</span>
            <Text variant={variant}>
              {variant === "prose"
                ? "This is prose text with relaxed leading, suitable for longer passages of content that benefit from extra line spacing for readability."
                : `This is ${variant} text.`}
            </Text>
          </div>
        ))}
        <div className="space-y-3 border-white/10 border-t pt-4">
          <Heading>Custom Element</Heading>
          <Text variant="description" as="div">
            This description renders as a div instead of the default p element.
          </Text>
        </div>
      </div>
    </PanelCard>
  )
}

export function KbdPanel() {
  return (
    <PanelCard id="ds-kbd" collapsible title="Kbd">
      <div className="space-y-4">
        <div className="space-y-2">
          <Heading>Single Keys</Heading>
          <div className="flex items-center gap-2">
            <Kbd>Esc</Kbd>
            <Kbd>Tab</Kbd>
            <Kbd>Enter</Kbd>
            <Kbd>Space</Kbd>
          </div>
        </div>
        <div className="space-y-2 border-white/10 border-t pt-4">
          <Heading>Modifier Combos (KbdGroup)</Heading>
          <div className="flex flex-wrap items-center gap-3">
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>S</Kbd>
            </KbdGroup>
            <KbdGroup>
              <Kbd>Cmd</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>Shift</Kbd>
              <Kbd>P</Kbd>
            </KbdGroup>
          </div>
        </div>
      </div>
    </PanelCard>
  )
}

export function SeparatorPanel() {
  return (
    <PanelCard id="ds-separator" collapsible title="Separator">
      <div className="space-y-4">
        <div className="space-y-2">
          <Heading>Horizontal</Heading>
          <p className="text-secondary text-sm">Content above</p>
          <Separator />
          <p className="text-secondary text-sm">Content below</p>
        </div>
        <div className="space-y-2 border-white/10 border-t pt-4">
          <Heading>Vertical</Heading>
          <div className="flex h-6 items-center gap-3">
            <span className="text-secondary text-sm">Left</span>
            <Separator orientation="vertical" />
            <span className="text-secondary text-sm">Center</span>
            <Separator orientation="vertical" />
            <span className="text-secondary text-sm">Right</span>
          </div>
        </div>
      </div>
    </PanelCard>
  )
}

export function AlertPanel() {
  return (
    <PanelCard id="ds-alert" collapsible title="Alert">
      <div className="space-y-4">
        <div className="space-y-2">
          <Heading>Default</Heading>
          <Alert>
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>This is a default alert with informational content.</AlertDescription>
          </Alert>
        </div>
        <div className="space-y-2 border-white/10 border-t pt-4">
          <Heading>Destructive</Heading>
          <Alert variant="destructive">
            <AlertTitle>Destructive Alert</AlertTitle>
            <AlertDescription>
              This is a destructive alert indicating an error or dangerous action.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </PanelCard>
  )
}

export function AvatarPanel() {
  return (
    <PanelCard id="ds-avatar" collapsible title="Avatar">
      <div className="space-y-4">
        <div className="space-y-2">
          <Heading>With Image</Heading>
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarImage src="https://avatar.vercel.sh/ds-small" alt="Small avatar" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Avatar className="size-10">
              <AvatarImage src="https://avatar.vercel.sh/ds-medium" alt="Medium avatar" />
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <Avatar className="size-12">
              <AvatarImage src="https://avatar.vercel.sh/ds-large" alt="Large avatar" />
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="space-y-2 border-white/10 border-t pt-4">
          <Heading>Fallback Initials</Heading>
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar className="size-10">
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
            <Avatar className="size-12">
              <AvatarFallback>EF</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </PanelCard>
  )
}

export function BreadcrumbPanel() {
  return (
    <PanelCard id="ds-breadcrumb" collapsible title="Breadcrumb">
      <div className="space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Text & Display</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </PanelCard>
  )
}
