"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Alert, AlertDescription, AlertTitle } from "@shared/design-primitives/components/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@shared/design-primitives/components/avatar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@shared/design-primitives/components/breadcrumb"
import { Heading } from "@shared/design-primitives/components/heading"
import { Separator } from "@shared/design-primitives/components/separator"
import { Text } from "@shared/design-primitives/components/text"
import { Kbd, KbdGroup } from "@shared/design-patterns/components/kbd"

const TEXT_VARIANTS = ["description", "hint", "caption", "prose"] as const

export function ComponentsTextDisplayPanels() {
  return (
    <>
      {}
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

      {}
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

      {}
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

      {}
      <PanelCard id="ds-alert" collapsible title="Alert">
        <div className="space-y-4">
          <div className="space-y-2">
            <Heading>Default</Heading>
            <Alert>
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>
                This is a default alert with informational content.
              </AlertDescription>
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

      {}
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

      {}
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
    </>
  )
}
