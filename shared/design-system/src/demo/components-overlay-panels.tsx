"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Button } from "@shared/design-primitives/components/button"
import { Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@shared/design-primitives/components/dialog"
import { Heading } from "@shared/design-primitives/components/heading"
import { Popover, PopoverContent, PopoverTrigger } from "@shared/design-primitives/components/popover"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@shared/design-primitives/components/sheet"
import { formatCompact, formatFull, formatPercent, formatPercentFull, Table, TableBody, TableCell, TableColumnLabel, TableHead, TableHeader, TableRow, TableRowLabel, TableTotalCell, TableValue } from "@shared/design-primitives/components/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/design-patterns/components/tabs"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"

export function ComponentsOverlayPanels() {
  return (
    <>
      {}
      <PanelCard id="ds-dialog" collapsible title="Dialog">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                Dialogs use surface-1 background. The overlay resets the elevation stack.
              </DialogDescription>
            </DialogHeader>
            <DialogBody className="py-4">
              <p className="text-secondary text-sm">Dialog content area.</p>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="tertiary">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="primary">Confirm</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PanelCard>

      {}
      <PanelCard id="ds-sheet" collapsible title="Sheet">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sheet Title</SheetTitle>
              <SheetDescription>
                Sheets use surface-1 background with blurred overlay, matching dialogs.
              </SheetDescription>
            </SheetHeader>
            <div className="p-4">
              <p className="text-secondary text-sm">Sheet content area.</p>
            </div>
          </SheetContent>
        </Sheet>
      </PanelCard>

      {}
      <PanelCard id="ds-popover" collapsible title="Popover">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-secondary text-sm">
              Popovers use surface-3 since they don't have an overlay.
            </p>
          </PopoverContent>
        </Popover>
      </PanelCard>

      {}
      <PanelCard id="ds-tabs" collapsible title="Tabs">
        <Tabs defaultValue="tab1">
          <TabsList className="w-fit">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className={cn("rounded-lg p-3", surfaceClass(2))}>
            <p className="text-secondary text-sm">Content for Tab 1</p>
          </TabsContent>
          <TabsContent value="tab2" className={cn("rounded-lg p-3", surfaceClass(2))}>
            <p className="text-secondary text-sm">Content for Tab 2</p>
          </TabsContent>
          <TabsContent value="tab3" className={cn("rounded-lg p-3", surfaceClass(2))}>
            <p className="text-secondary text-sm">Content for Tab 3</p>
          </TabsContent>
        </Tabs>
      </PanelCard>

      {}
      <PanelCard id="ds-table" collapsible title="Table">
        <div className="space-y-4">
          <p className="text-secondary text-sm">
            Data tables display metrics with row and column labels that have popovers. Values show
            compact format with full precision on hover.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16" />
                <TableColumnLabel
                  label="Item A"
                  fullName="Item Alpha"
                  description="The first item in the dataset"
                />
                <TableColumnLabel
                  label="Item B"
                  fullName="Item Beta"
                  description="The second item in the dataset"
                />
                <TableColumnLabel
                  label="Item C"
                  fullName="Item Charlie"
                  description="The third item in the dataset"
                />
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableRowLabel
                  label="Value"
                  fullName="Total Value"
                  description="The total value of the item"
                />
                <TableCell>
                  <TableValue compact={formatCompact(1234)} full={formatFull(1234)} />
                </TableCell>
                <TableCell>
                  <TableValue compact={formatCompact(5678)} full={formatFull(5678)} />
                </TableCell>
                <TableCell>
                  <TableValue compact={formatCompact(91011)} full={formatFull(91011)} />
                </TableCell>
                <TableTotalCell>
                  <TableValue compact={formatCompact(97923)} full={formatFull(97923)} />
                </TableTotalCell>
              </TableRow>
              <TableRow>
                <TableRowLabel
                  label="Pct"
                  fullName="Percentage"
                  description="Percentage of the total"
                />
                <TableCell>
                  <TableValue compact={formatPercent(1.26)} full={formatPercentFull(1.26)} />
                </TableCell>
                <TableCell>
                  <TableValue compact={formatPercent(5.8)} full={formatPercentFull(5.8)} />
                </TableCell>
                <TableCell>
                  <TableValue compact={formatPercent(92.94)} full={formatPercentFull(92.94)} />
                </TableCell>
                <TableTotalCell>100%</TableTotalCell>
              </TableRow>
              <TableRow>
                <TableRowLabel
                  label="Rate"
                  fullName="Rate Per Second"
                  description="Average rate per second"
                />
                <TableCell>
                  <TableValue compact={formatCompact(123.45)} full={formatFull(123.45)} />
                </TableCell>
                <TableCell>
                  <TableValue compact={formatCompact(567.89)} full={formatFull(567.89)} />
                </TableCell>
                <TableCell>
                  <TableValue compact={formatCompact(9101.12)} full={formatFull(9101.12)} />
                </TableCell>
                <TableTotalCell>
                  <TableValue compact={formatCompact(9792.46)} full={formatFull(9792.46)} />
                </TableTotalCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="space-y-2">
            <Heading>Key Features</Heading>
            <div className={cn("space-y-1 rounded p-3 text-xs", surfaceClass(2))}>
              <div className="flex gap-2">
                <span className="text-primary">1.</span>
                <span className="text-secondary">
                  <strong className="text-primary">TableRowLabel:</strong> Row headers with popover
                  showing full name and description
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">2.</span>
                <span className="text-secondary">
                  <strong className="text-primary">TableColumnLabel:</strong> Column headers with
                  popover showing full name and description
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">3.</span>
                <span className="text-secondary">
                  <strong className="text-primary">TableValue:</strong> Compact display with full
                  precision on hover
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">4.</span>
                <span className="text-secondary">
                  <strong className="text-primary">TableTotalCell:</strong> Semibold styling for
                  totals column
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">5.</span>
                <span className="text-secondary">
                  <strong className="text-primary">Format utilities:</strong> formatCompact,
                  formatFull, formatPercent, formatPercentFull
                </span>
              </div>
            </div>
          </div>
        </div>
      </PanelCard>
    </>
  )
}
