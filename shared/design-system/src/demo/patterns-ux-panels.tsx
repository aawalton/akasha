"use client"

import { AlertCircle, FolderOpen, Search } from "lucide-react"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Button } from "@shared/design-primitives/components/button"
import { Heading } from "@shared/design-primitives/components/heading"
import { Spinner } from "@shared/design-primitives/components/spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared/design-primitives/components/table"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@shared/design-patterns/components/empty"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"
import { PatternsUxLayoutPanels } from "./patterns-ux-layout-panels"

export function PatternsUxPanels() {
  return (
    <>
      {}
      <PanelCard id="ds-data-states" collapsible title="Data States">
        <div className="space-y-4">
          <p className="text-secondary text-sm">
            Every data-displaying component exists in one of four states. Visual feedback is
            immediate and predictable.
          </p>

          <div className="space-y-2">
            <Heading>Decision Tree</Heading>
            <div className={cn("space-y-1 rounded p-3 font-mono text-xs", surfaceClass(2))}>
              <div className="text-secondary">
                Is data being fetched? ────►{" "}
                <span className="font-bold text-accent">Loading (Skeleton)</span>
              </div>
              <div className="text-tertiary"> │</div>
              <div className="text-tertiary"> ↓ No</div>
              <div className="text-secondary">
                Did fetch fail? ───────────►{" "}
                <span className="text-secondary">Error (Empty + neutral)</span>
              </div>
              <div className="text-tertiary"> │</div>
              <div className="text-tertiary"> ↓ No</div>
              <div className="text-secondary">
                Is result empty? ──────────►{" "}
                <span className="text-secondary">Empty (Empty + action)</span>
              </div>
              <div className="text-tertiary"> │</div>
              <div className="text-tertiary"> ↓ No</div>
              <div className="text-secondary">
                {" "}
                <span className="text-primary">Loaded (Content)</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Heading>Component Usage</Heading>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Use Case</TableHead>
                  <TableHead>Component</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-left text-primary">
                    Content areas (layout matters)
                  </TableCell>
                  <TableCell className="font-bold text-accent">Skeleton</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-left text-primary">
                    User-initiated actions (buttons)
                  </TableCell>
                  <TableCell className="font-bold text-accent">Spinner</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-left text-primary">Empty data results</TableCell>
                  <TableCell className="font-bold text-accent">Empty</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-left text-primary">Error states</TableCell>
                  <TableCell className="font-bold text-accent">Empty + neutral</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="space-y-2">
            <Heading>Live Demos</Heading>
            <div className="grid gap-4">
              {}
              <div className="space-y-2">
                <div className="text-secondary text-xs">Button Loading State (Spinner)</div>
                <div className={cn("rounded-lg p-4", surfaceClass(2))}>
                  <Button variant="accent" disabled>
                    <Spinner />
                    Creating...
                  </Button>
                </div>
              </div>

              {}
              <div className="space-y-2">
                <div className="text-secondary text-xs">Empty State</div>
                <div className={cn("rounded-lg", surfaceClass(2))}>
                  <Empty className="py-6">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <FolderOpen />
                      </EmptyMedia>
                      <EmptyTitle>No builds yet</EmptyTitle>
                      <EmptyDescription>Create your first build to get started.</EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <Button variant="accent" size="sm">
                        Create Build
                      </Button>
                    </EmptyContent>
                  </Empty>
                </div>
              </div>

              {}
              <div className="space-y-2">
                <div className="text-secondary text-xs">Error State</div>
                <div className={cn("rounded-lg", surfaceClass(2))}>
                  <Empty className="py-6">
                    <EmptyHeader>
                      <EmptyMedia variant="icon" className={cn("text-secondary", surfaceClass(3))}>
                        <AlertCircle />
                      </EmptyMedia>
                      <EmptyTitle>Failed to load</EmptyTitle>
                      <EmptyDescription>
                        Something went wrong while loading the data.
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <Button variant="secondary" size="sm">
                        Try Again
                      </Button>
                    </EmptyContent>
                  </Empty>
                </div>
              </div>

              {}
              <div className="space-y-2">
                <div className="text-secondary text-xs">Search No Results</div>
                <div className={cn("rounded-lg", surfaceClass(2))}>
                  <Empty className="py-6">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Search />
                      </EmptyMedia>
                      <EmptyTitle>No results found</EmptyTitle>
                      <EmptyDescription>Try a different search term.</EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-loading-skeletons" collapsible title="Loading Skeletons">
        <div className="space-y-4">
          <p className="text-secondary text-sm">
            Skeletons preserve layout during load. They match the exact structure and dimensions of
            real content to prevent layout shift.
          </p>

          <div className="space-y-2">
            <Heading>Core Principles</Heading>
            <div className={cn("space-y-1 rounded p-3 text-xs", surfaceClass(2))}>
              <div className="flex gap-2">
                <span className="text-primary">1.</span>
                <span className="text-secondary">
                  Mirror page structure (same layout, columns, responsive breakpoints)
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">2.</span>
                <span className="text-secondary">
                  Use exact dimensions (pre-calculate heights if needed)
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">3.</span>
                <span className="text-secondary">
                  Show container shape + minimal title placeholder, not detailed content
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">4.</span>
                <span className="text-secondary">
                  Use <code className="text-primary">bg-surface-1</code> for all skeleton
                  placeholder elements
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">5.</span>
                <span className="text-secondary">
                  Apply subtle shimmer animation to page and panel card titles only
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">6.</span>
                <span className="text-secondary">
                  Page skeletons should use <code className="text-primary">PageLayout</code> and its
                  subcomponents to keep padding and container classes in sync
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">7.</span>
                <span className="text-secondary">
                  Tab-navigated pages should show tab-appropriate skeleton layouts based on the
                  active tab
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Heading>Skeleton vs Spinner</Heading>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Component</TableHead>
                  <TableHead className="text-left">When to Use</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-left font-bold text-accent">Skeleton</TableCell>
                  <TableCell className="text-left text-primary">
                    Initial page/content load where layout matters
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-left font-bold text-accent">Spinner</TableCell>
                  <TableCell className="text-left text-primary">
                    User-initiated actions (button clicks, form submits)
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="space-y-2">
            <Heading>Live Example</Heading>
            <p className="text-secondary text-xs">
              This page's <code className="text-primary">loading.tsx</code> demonstrates the
              pattern. It mirrors the PageLayout structure with Header, Tabs, and Content sections,
              using pre-calculated panel heights from{" "}
              <code className="text-primary">skeleton-heights.json</code>.
            </p>
          </div>
        </div>
      </PanelCard>

      <PatternsUxLayoutPanels />
    </>
  )
}
