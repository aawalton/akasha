"use client"

import { PanelCard } from "akasha/design/interfaces/layout/panel-card/panel-card.module.code.tsx"
import { cn } from "akasha/design/interfaces/primitives/cn/cn.module.code.ts"
import { Heading } from "akasha/design/interfaces/primitives/heading/heading.module.code.tsx"
import { surfaceClass } from "akasha/design/interfaces/primitives/surface-class/surface-class.module.code.ts"

export function LayoutSpacingPanels() {
  return (
    <PanelCard
      id="ds-parents-control-child-layout"
      collapsible
      title="Parents Control Child Layout"
    >
      <div className="space-y-4">
        <p className="text-secondary text-sm">
          Reusable components never set their own external spacing. The parent decides how children
          are positioned and spaced.
        </p>

        <div className="space-y-2">
          <Heading>Why</Heading>
          <p className="text-secondary text-sm">
            This keeps components reusable across different layout contexts and prevents conflicts
            like a child setting margin-top while the parent uses gap.
          </p>
        </div>

        <div className="space-y-2">
          <Heading>Rules</Heading>
          <div className={cn("space-y-1 rounded p-3 text-xs", surfaceClass(2))}>
            <div className="flex gap-2">
              <span className="text-primary">1.</span>
              <span className="text-secondary">
                No external <code className="font-mono text-tertiary">margin</code> on reusable
                components
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">2.</span>
              <span className="text-secondary">
                No external <code className="font-mono text-tertiary">padding</code> on reusable
                components
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Heading>Exceptions</Heading>
          <div className={cn("space-y-1 rounded p-3 text-xs", surfaceClass(2))}>
            <div className="flex gap-2">
              <span className="text-primary">1.</span>
              <span className="text-secondary">
                <strong>Visible surface boundary</strong> — Components with their own background
                color can have internal padding (e.g., Button, Badge, Card, TabsList,
                DropdownMenuContent)
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">2.</span>
              <span className="text-secondary">
                <strong>Tightly-coupled sub-components</strong> — Components that only exist within
                a parent system can coordinate spacing with that parent (e.g., menu labels,
                separators)
              </span>
            </div>
          </div>
        </div>
      </div>
    </PanelCard>
  )
}
