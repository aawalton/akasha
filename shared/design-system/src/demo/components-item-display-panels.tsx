"use client"

import { useState } from "react"
import { Badge } from "@shared/design-badges/components/badge"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Button } from "@shared/design-primitives/components/button"
import { HorizontalScrollFade } from "@shared/design-primitives/components/horizontal-scroll-fade"
import { ScrollArea, ScrollBar } from "@shared/design-primitives/components/scroll-area"
import { Chip } from "@shared/design-patterns/components/chip"
import { ChipList } from "@shared/design-patterns/components/chip-list"
import { ItemCard } from "@shared/design-patterns/components/item-card"
import { ItemRow } from "@shared/design-patterns/components/item-row"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"

export function ComponentsItemDisplayPanels() {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
    materials: true,
    alchemy: false,
  })

  const toggleRow = (key: string) => setExpandedRows((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <>
      {}
      <PanelCard id="ds-chip" collapsible title="Chip">
        <p className="text-secondary text-sm">
          Small inline element for displaying metadata. Supports optional action nodes.
        </p>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Chip>Basic chip</Chip>
            <Chip>Stamina</Chip>
            <Chip>Magicka</Chip>
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip
              actions={[
                <Button key="rm" variant="tertiary" size="icon-sm">
                  &times;
                </Button>,
              ]}
            >
              With action
            </Chip>
            <Chip
              actions={[
                <Badge key="count" variant="accent">
                  3
                </Badge>,
                <Button key="rm" variant="tertiary" size="icon-sm">
                  &times;
                </Button>,
              ]}
            >
              Multiple actions
            </Chip>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-chip-list" collapsible title="ChipList">
        <p className="text-secondary text-sm">
          Renders a list of Chips with a <code>maxChips</code> overflow popover showing "+N more".
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-tertiary text-xs">3 chips, no overflow</p>
            <ChipList>
              <Chip>Fire</Chip>
              <Chip>Frost</Chip>
              <Chip>Shock</Chip>
            </ChipList>
          </div>
          <div className="space-y-2">
            <p className="text-tertiary text-xs">6 chips, maxChips=3</p>
            <ChipList maxChips={3}>
              <Chip>Fire</Chip>
              <Chip>Frost</Chip>
              <Chip>Shock</Chip>
              <Chip>Poison</Chip>
              <Chip>Disease</Chip>
              <Chip>Oblivion</Chip>
            </ChipList>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-item-card" collapsible title="ItemCard">
        <p className="text-secondary text-sm">
          Flexible card for displaying items with icon, content, and action buttons.
        </p>
        <div className="space-y-3">
          <ItemCard
            renderIcon={() => <span className="text-lg">&#9876;</span>}
            renderContent={() => (
              <div>
                <p className="font-medium text-primary text-sm">Basic Item Card</p>
                <p className="text-secondary text-xs">With icon and content</p>
              </div>
            )}
          />
          <ItemCard
            renderIcon={() => <span className="text-lg">&#128737;</span>}
            renderContent={() => (
              <div>
                <p className="font-medium text-primary text-sm">With Actions</p>
                <p className="text-secondary text-xs">Info, add, and remove buttons</p>
              </div>
            )}
            onInfo={() => {}}
            infoLabel="Item info"
            onAdd={() => {}}
            addLabel="Add item"
            onRemove={() => {}}
            removeLabel="Remove item"
          />
          <ItemCard
            renderContent={() => (
              <div>
                <p className="font-medium text-primary text-sm">Clickable Card</p>
                <p className="text-secondary text-xs">No icon, clickable with remove action</p>
              </div>
            )}
            onClick={() => {}}
            onRemove={() => {}}
            removeLabel="Remove"
          />
          <ItemCard
            renderIcon={() => <span className="text-lg">&#11088;</span>}
            renderContent={() => (
              <div>
                <p className="font-medium text-primary text-sm">Elevated Card</p>
                <p className="text-secondary text-xs">Uses surface-3 background</p>
              </div>
            )}
            onRemove={() => {}}
            removeLabel="Remove"
          />
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-item-row" collapsible title="ItemRow">
        <p className="text-secondary text-sm">
          Compact row for item lists with support for nesting depth, quantities, values, and
          expand/collapse.
        </p>
        <div className="space-y-1">
          <ItemRow
            label={<span className="text-sm">Materials</span>}
            value="1,250g"
            expanded={expandedRows.materials}
            onToggle={() => toggleRow("materials")}
            actionButtonCount={1}
          />
          {expandedRows.materials && (
            <>
              <ItemRow
                label={<span className="text-sm">Rubedite Ingot</span>}
                quantity={20}
                value="100g"
                depth={1}
                actionButtonCount={1}
              />
              <ItemRow
                label={<span className="text-sm">Ruby Ash Sanded</span>}
                quantity={15}
                value="75g"
                depth={1}
                actionButtonCount={1}
              />
              <ItemRow
                label={<span className="text-sm">Ancestor Silk</span>}
                quantity={10}
                value="200g"
                depth={1}
                accent
                actionButtonCount={1}
              />
            </>
          )}
          <ItemRow
            label={<span className="text-sm">Alchemy</span>}
            value="430g"
            expanded={expandedRows.alchemy}
            onToggle={() => toggleRow("alchemy")}
            actionButtonCount={1}
          />
          {expandedRows.alchemy && (
            <>
              <ItemRow
                label={<span className="text-sm">Columbine</span>}
                quantity={50}
                value="200g"
                depth={1}
                actionButtonCount={1}
              />
              <ItemRow
                label={<span className="text-sm">Mountain Flower</span>}
                quantity={30}
                value="60g"
                depth={1}
                actionButtonCount={1}
              />
            </>
          )}
          <ItemRow
            label={<span className="text-sm">Potions</span>}
            value="800g"
            actionButtonCount={1}
          />
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-horizontal-scroll-fade" collapsible title="HorizontalScrollFade">
        <p className="text-secondary text-sm">
          Wraps overflowing content with fade gradients at the scroll edges. Supports
          drag-to-scroll.
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-tertiary text-xs">Default fade (16px)</p>
            <HorizontalScrollFade>
              <div className="flex gap-2">
                {Array.from({ length: 20 }, (_, i) => (
                  <Badge key={i} variant="elevation" className="shrink-0">
                    Badge {i + 1}
                  </Badge>
                ))}
              </div>
            </HorizontalScrollFade>
          </div>
          <div className="space-y-2">
            <p className="text-tertiary text-xs">Custom fade (32px)</p>
            <HorizontalScrollFade fadeWidth={32}>
              <div className="flex gap-2">
                {Array.from({ length: 15 }, (_, i) => (
                  <Button key={i} variant="secondary" size="sm" className="shrink-0">
                    Action {i + 1}
                  </Button>
                ))}
              </div>
            </HorizontalScrollFade>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-scroll-area" collapsible title="ScrollArea">
        <p className="text-secondary text-sm">
          Radix-based scroll area with styled scrollbars. Supports vertical and horizontal
          orientations.
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-tertiary text-xs">Vertical scroll</p>
            <ScrollArea className={cn("h-40 rounded-md p-3", surfaceClass(2))}>
              <div className="space-y-2">
                {Array.from({ length: 20 }, (_, i) => (
                  <p key={i} className="text-secondary text-sm">
                    Scrollable row {i + 1}
                  </p>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="space-y-2">
            <p className="text-tertiary text-xs">Horizontal scroll</p>
            <ScrollArea className={cn("w-full rounded-md p-3", surfaceClass(2))}>
              <div className="flex gap-3">
                {Array.from({ length: 15 }, (_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex h-16 w-24 shrink-0 items-center justify-center rounded-md text-secondary text-xs",
                      surfaceClass(3)
                    )}
                  >
                    Item {i + 1}
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </PanelCard>
    </>
  )
}
