"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import { cn } from "@akasha/design-primitives/cn"
import { Heading } from "@akasha/design-primitives/heading"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@akasha/design-primitives/table"

export function PatternsUxLayoutPanels() {
  return (
    <>
      {}
      <PanelCard id="ds-large-list-patterns" collapsible title="Large List Patterns">
        <div className="space-y-4">
          <p className="text-secondary text-sm">
            When lists exceed ~50 items, apply these patterns for performance and usability.
          </p>

          <div className="space-y-2">
            <Heading>Loading Strategy</Heading>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Context</TableHead>
                  <TableHead className="text-left">Pattern</TableHead>
                  <TableHead className="text-left">Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-left font-bold text-accent">Mobile lists</TableCell>
                  <TableCell className="text-left text-primary">"Load More" button</TableCell>
                  <TableCell className="text-left text-secondary">
                    User-controlled, preserves footer access
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-left font-bold text-accent">Desktop search</TableCell>
                  <TableCell className="text-left text-primary">Pagination</TableCell>
                  <TableCell className="text-left text-secondary">
                    Skip irrelevant results, stable DOM
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-tertiary text-xs">
              Avoid infinite scroll for search UX — it prevents refinding items and blocks footer
              access.
            </p>
          </div>

          <div className="space-y-2">
            <Heading>Key Patterns</Heading>
            <div className={cn("space-y-1 rounded p-3 text-xs", surfaceClass(2))}>
              <div className="flex gap-2">
                <span className="font-bold text-accent">Virtualization</span>
                <span className="text-secondary">
                  Lists &gt;50 items must use windowing (tanstack-virtual). Render only visible rows
                  + buffer.
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-accent">Scroll Restore</span>
                <span className="text-secondary">
                  Cache results and scroll position. Restore on "Back" navigation.
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-accent">Prefetching</span>
                <span className="text-secondary">
                  Fetch next batch when user scrolls near "Load More" button. Instant on click.
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-accent">a11y</span>
                <span className="text-secondary">
                  Move focus to first new item on load. Announce count via aria-live="polite".
                </span>
              </div>
            </div>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-spacing-pattern" collapsible title="Spacing Pattern">
        <div className="space-y-4">
          <p className="text-secondary text-sm">
            Each component owns the space before it: top in vertical layouts, left in horizontal
            layouts. This creates predictable, composable layouts where spacing is determined by
            what follows, not what precedes.
          </p>

          <div className="space-y-2">
            <Heading>The Rule</Heading>
            <div className={cn("space-y-1 rounded p-3 text-xs", surfaceClass(2))}>
              <div className="flex gap-2">
                <span className="text-primary">1.</span>
                <span className="text-secondary">
                  Vertical: components add margin/padding to their top, never bottom
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">2.</span>
                <span className="text-secondary">
                  Horizontal: components add margin/padding to their left, never right
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">3.</span>
                <span className="text-secondary">
                  Exception: parent containers using <code className="text-primary">gap-*</code>{" "}
                  handle spacing for all children
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">4.</span>
                <span className="text-secondary">
                  First child in a container typically needs no leading spacing
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Heading>Page Layout Example</Heading>
            <div className={cn("space-y-1 rounded p-3 font-mono text-xs", surfaceClass(2))}>
              <div className="text-secondary">
                PageHeader ────────► <span className="font-bold text-accent">pt-6</span> (top only)
              </div>
              <div className="text-secondary">
                PageTabs ──────────► <span className="font-bold text-accent">pt-6</span> (owns space
                above)
              </div>
              <div className="text-secondary">
                PageContent ───────► <span className="font-bold text-accent">pt-6</span> (owns space
                above)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={cn("space-y-2 rounded-lg p-3", surfaceClass(2))}>
              <p className="text-primary text-sm">Correct (vertical)</p>
              <code className="block whitespace-pre-wrap font-mono text-secondary text-xs">
                {`<Header />      {/* pt-6 */}
<Content />     {/* pt-6 */}`}
              </code>
            </div>
            <div className={cn("space-y-2 rounded-lg p-3", surfaceClass(3))}>
              <p className="text-secondary text-sm">Incorrect</p>
              <code className="block whitespace-pre-wrap font-mono text-secondary text-xs">
                {`<Header />      {/* pb-6 */}
<Content />     {/* pt-6 */}
{/* Double spacing! */}`}
              </code>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={cn("space-y-2 rounded-lg p-3", surfaceClass(2))}>
              <p className="text-primary text-sm">Correct (horizontal)</p>
              <code className="block whitespace-pre-wrap font-mono text-secondary text-xs">
                {`<Label />       {/* no pr */}
<Input />       {/* pl-3 */}`}
              </code>
            </div>
            <div className={cn("space-y-2 rounded-lg p-3", surfaceClass(3))}>
              <p className="text-secondary text-sm">Incorrect</p>
              <code className="block whitespace-pre-wrap font-mono text-secondary text-xs">
                {`<Label />       {/* pr-3 */}
<Input />       {/* pl-3 */}
{/* Double spacing! */}`}
              </code>
            </div>
          </div>
        </div>
      </PanelCard>
    </>
  )
}
