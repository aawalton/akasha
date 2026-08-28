"use client"

import { PageTabHeader } from "@shared/design-layout/components/page-tab-header"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import { useColumnCount } from "@shared/design-layout/components/use-column-count"
import { Heading } from "@shared/design-primitives/components/heading"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared/design-primitives/components/table"
import { COLUMN_WIDTH } from "@shared/design-layout/components/layout-data"
import { getPageWidth } from "@shared/design-layout/components/page-layout-data"
import { TabsContent } from "@shared/design-patterns/components/tabs"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"

export function LayoutTabContent() {
  const columnCount = useColumnCount()
  return (
    <TabsContent value="layout">
      <div className="flex flex-col gap-6">
        <PageTabHeader title="Layout" />
        <ResponsiveColumns>
          {}
          <PanelCard id="ds-page-layout" collapsible title="PageLayout">
            <div className="space-y-4">
              <p className="text-secondary text-sm">
                Responsive page container that provides consistent width constraints and column
                count context.
              </p>

              <div className="space-y-2">
                <Heading>Width Values</Heading>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Columns</TableHead>
                      <TableHead>Panel Width</TableHead>
                      <TableHead>Gap</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-left text-primary">1</TableCell>
                      <TableCell className="text-tertiary">472px</TableCell>
                      <TableCell className="text-tertiary">-</TableCell>
                      <TableCell className="font-bold text-accent">{COLUMN_WIDTH}px</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-left text-primary">2</TableCell>
                      <TableCell className="text-tertiary">472px x 2</TableCell>
                      <TableCell className="text-tertiary">24px</TableCell>
                      <TableCell className="font-bold text-accent">
                        {getPageWidth(2) - 48}px
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-left text-primary">3</TableCell>
                      <TableCell className="text-tertiary">472px x 3</TableCell>
                      <TableCell className="text-tertiary">48px</TableCell>
                      <TableCell className="font-bold text-accent">
                        {getPageWidth(3) - 48}px
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-2">
                <Heading>Exports</Heading>
                <div className={cn("space-y-1 rounded p-3 font-mono text-xs", surfaceClass(2))}>
                  <div>
                    <span className="text-primary">COLUMN_WIDTH</span>
                    <span className="text-tertiary"> - Panel width: 472px</span>
                  </div>
                  <div>
                    <span className="text-primary">COLUMN_GAP</span>
                    <span className="text-tertiary"> - Gap between columns: 24px</span>
                  </div>
                  <div>
                    <span className="text-primary">getPageWidth(n)</span>
                    <span className="text-tertiary"> - Total page width for n columns</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Heading>Server Components</Heading>
                <div className={cn("space-y-2 rounded p-3 font-mono text-xs", surfaceClass(2))}>
                  <div>
                    <div className="text-secondary">{`// app/builds/page.tsx`}</div>
                    <div className="text-secondary">{`import { RESPONSIVE_PAGE_WIDTH } from "@/components/ui/page-layout"`}</div>
                  </div>
                  <div className="text-secondary">{`<div className={cn("mx-auto w-full", RESPONSIVE_PAGE_WIDTH)}>`}</div>
                </div>
              </div>

              <div className="space-y-2">
                <Heading>Client Components</Heading>
                <div className={cn("rounded p-3 font-mono text-xs", surfaceClass(2))}>
                  <div className="text-secondary">{`<PageLayout>`}</div>
                  <div className="text-secondary">{`  <PageLayout.Header>...</PageLayout.Header>`}</div>
                  <div className="text-secondary">{`  <PageLayout.Tabs>...</PageLayout.Tabs>`}</div>
                  <div className="text-secondary">{`  <PageLayout.Content>...</PageLayout.Content>`}</div>
                  <div className="text-secondary">{`</PageLayout>`}</div>
                </div>
              </div>
            </div>
          </PanelCard>

          {}
          <PanelCard id="ds-panel-card" collapsible title="PanelCard">
            <div className="space-y-4">
              <p className="text-secondary text-sm">
                Fixed-width content container optimized for build editor panels.
              </p>

              <div className="space-y-2">
                <Heading>Fixed Width</Heading>
                <p className="text-secondary text-sm">
                  472px on sm+ screens, full-width on mobile. Uses{" "}
                  <code className={cn("rounded px-1 font-mono text-xs", surfaceClass(2))}>
                    PANEL_CARD_WIDTH_CLASSES
                  </code>{" "}
                  export.
                </p>
              </div>

              <div className="space-y-2">
                <Heading>Default Height</Heading>
                <p className="text-secondary text-sm">
                  232px when content doesn't naturally determine height. Use{" "}
                  <code className={cn("rounded px-1 font-mono text-xs", surfaceClass(2))}>
                    h-[232px]
                  </code>{" "}
                  for list cards, textarea panels, and similar fixed-height containers.
                </p>
              </div>

              <div className="space-y-2">
                <Heading>Responsive Default Behavior</Heading>
                <p className="text-secondary text-sm">
                  Collapsible PanelCards automatically collapse on single-column layouts and expand
                  on multi-column layouts. This provides an optimal experience across screen sizes
                  without manual configuration.
                </p>
              </div>

              <div className="space-y-2">
                <Heading>Props</Heading>
                <div className={cn("space-y-1 rounded p-3 font-mono text-xs", surfaceClass(2))}>
                  <div>
                    <span className="text-primary">title?:</span> ReactNode
                  </div>
                  <div>
                    <span className="text-primary">headerSubtitle?:</span> ReactNode
                  </div>
                  <div>
                    <span className="text-primary">collapsible?:</span> boolean
                  </div>
                  <div>
                    <span className="text-primary">defaultOpen?:</span> boolean (escape hatch;
                    rarely needed)
                  </div>
                  <div>
                    <span className="text-primary">open?:</span> boolean (controlled)
                  </div>
                  <div>
                    <span className="text-primary">onOpenChange?:</span> (open: boolean) =&gt; void
                  </div>
                </div>
              </div>
            </div>
          </PanelCard>

          {}
          <PanelCard id="ds-responsive-columns" collapsible title="ResponsiveColumns">
            <div className="space-y-4">
              <p className="text-secondary text-sm">
                Column layout panel with alternating item assignment.
              </p>

              <div className="space-y-2">
                <Heading>Distribution</Heading>
                <p className="text-secondary text-sm">
                  Items are distributed across columns in round-robin order. With 2 columns: item 0
                  → left, item 1 → right, item 2 → left, etc.
                </p>
              </div>

              <div className="space-y-2">
                <Heading>Props</Heading>
                <div className={cn("space-y-1 rounded p-3 font-mono text-xs", surfaceClass(2))}>
                  <div>
                    <span className="text-primary">columnCount?:</span> 1 | 2 | 3 - Number of
                    columns (defaults to layout context; override only for sidebars)
                  </div>
                  <div>
                    <span className="text-primary">footer?:</span> ReactNode
                  </div>
                  <div>
                    <span className="text-primary">className?:</span> string
                  </div>
                </div>
              </div>
            </div>
          </PanelCard>

          {}
          <PanelCard id="ds-use-column-count" collapsible title="useColumnCount Hook">
            <div className="space-y-4">
              <p className="text-secondary text-sm">
                Returns the current column count for UI state decisions. Collapsible PanelCards now
                use this automatically for responsive defaults (collapsed on single-column, expanded
                on multi-column), so manual usage is rarely needed. For layout, use CSS-only
                ResponsiveColumns instead.
              </p>

              <div className="space-y-2">
                <Heading>Breakpoints</Heading>
                <div className={cn("space-y-1 rounded p-3 font-mono text-xs", surfaceClass(2))}>
                  <div>
                    <span className="text-primary">&lt; 1024px:</span> 1 column (lg breakpoint)
                  </div>
                  <div>
                    <span className="text-primary">1024px - 1535px:</span> 2 columns
                  </div>
                  <div>
                    <span className="text-primary">&gt;= 1536px:</span> 3 columns (2xl breakpoint)
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Heading>Current Value</Heading>
                <div className={cn("rounded p-3", surfaceClass(2))}>
                  <span className="text-secondary">columnCount = </span>
                  <span className="font-bold font-mono text-accent">{columnCount}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Heading>Position-Based Defaults</Heading>
                <div className={cn("rounded p-3 text-secondary text-xs", surfaceClass(2))}>
                  <p>
                    ResponsiveColumns wraps each child with a context provider that computes whether
                    it should default to open based on its position in its column. Single column:
                    first 1 card open. Multi-column: first 2 per column.
                  </p>
                </div>
              </div>
            </div>
          </PanelCard>

          {}
          <PanelCard
            id="ds-parents-control-child-layout"
            collapsible
            title="Parents Control Child Layout"
          >
            <div className="space-y-4">
              <p className="text-secondary text-sm">
                Reusable components never set their own external spacing. The parent decides how
                children are positioned and spaced.
              </p>

              <div className="space-y-2">
                <Heading>Why</Heading>
                <p className="text-secondary text-sm">
                  This keeps components reusable across different layout contexts and prevents
                  conflicts like a child setting margin-top while the parent uses gap.
                </p>
              </div>

              <div className="space-y-2">
                <Heading>Rules</Heading>
                <div className={cn("space-y-1 rounded p-3 text-xs", surfaceClass(2))}>
                  <div className="flex gap-2">
                    <span className="text-primary">1.</span>
                    <span className="text-secondary">
                      No external <code className="font-mono text-tertiary">margin</code> on
                      reusable components
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">2.</span>
                    <span className="text-secondary">
                      No external <code className="font-mono text-tertiary">padding</code> on
                      reusable components
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
                      <strong>Visible surface boundary</strong> — Components with their own
                      background color can have internal padding (e.g., Button, Badge, Card,
                      TabsList, DropdownMenuContent)
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">2.</span>
                    <span className="text-secondary">
                      <strong>Tightly-coupled sub-components</strong> — Components that only exist
                      within a parent system can coordinate spacing with that parent (e.g., menu
                      labels, separators)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </PanelCard>
        </ResponsiveColumns>
      </div>
    </TabsContent>
  )
}
