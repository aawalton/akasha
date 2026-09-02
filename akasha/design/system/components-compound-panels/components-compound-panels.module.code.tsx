"use client"

import { Calendar } from "@akasha/design-forms/calendar"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@akasha/design-forms/field"
import { PanelCard } from "@akasha/design-layout/panel-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@akasha/design-primitives/carousel"
import { cn } from "@akasha/design-primitives/cn"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@akasha/design-primitives/command"
import { Heading } from "@akasha/design-primitives/heading"
import { Input } from "@akasha/design-primitives/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@akasha/design-primitives/resizable"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import {
  Calculator,
  Calendar as CalendarIcon,
  FileText,
  Home,
  Search,
  Settings,
  Smile,
  User,
} from "lucide-react"
import { useState } from "react"
import type { DateRange } from "react-day-picker"

export function ComponentsCompoundPanels() {
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date())
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  })

  return (
    <>
      {}
      <PanelCard id="ds-field" collapsible title="Field">
        <p className="text-secondary text-sm">
          Form field layout with label, description, and error support. Supports vertical,
          horizontal, and responsive orientations.
        </p>
        <div className="space-y-6">
          <div className="space-y-1">
            <Heading>Vertical (default)</Heading>
            <FieldSet>
              <FieldGroup>
                <Field orientation="vertical">
                  <FieldLabel htmlFor="field-v-name">Full Name</FieldLabel>
                  <Input id="field-v-name" placeholder="Enter your name" />
                  <FieldDescription>Your first and last name.</FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>

          <div className="space-y-1">
            <Heading>Horizontal</Heading>
            <FieldSet>
              <FieldGroup>
                <Field orientation="horizontal">
                  <FieldLabel htmlFor="field-h-email">Email</FieldLabel>
                  <Input id="field-h-email" type="email" placeholder="you@example.com" />
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>

          <div className="space-y-1">
            <Heading>Responsive</Heading>
            <FieldSet>
              <FieldGroup>
                <Field orientation="responsive">
                  <FieldLabel htmlFor="field-r-username">Username</FieldLabel>
                  <Input id="field-r-username" placeholder="Choose a username" />
                  <FieldDescription>
                    Stacks vertically on small screens, horizontal on wider.
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>

          <div className="space-y-1">
            <Heading>With separator and invalid state</Heading>
            <FieldSet>
              <FieldGroup>
                <Field orientation="vertical" data-invalid="true">
                  <FieldLabel htmlFor="field-err-pw">Password</FieldLabel>
                  <Input id="field-err-pw" type="password" placeholder="Enter password" />
                </Field>
                <FieldSeparator />
                <Field orientation="vertical">
                  <FieldLabel htmlFor="field-err-confirm">Confirm Password</FieldLabel>
                  <Input id="field-err-confirm" type="password" placeholder="Re-enter password" />
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-calendar" collapsible title="Calendar">
        <p className="text-secondary text-sm">
          Date picker based on react-day-picker. Supports single date and range selection.
        </p>
        <div className="space-y-6">
          <div className="space-y-1">
            <Heading>Single date</Heading>
            <Calendar mode="single" selected={singleDate} onSelect={setSingleDate} />
            <p className="text-secondary text-sm">
              Selected: <code>{singleDate?.toLocaleDateString() ?? "(none)"}</code>
            </p>
          </div>

          <div className="space-y-1">
            <Heading>Date range</Heading>
            <Calendar mode="range" selected={dateRange} onSelect={setDateRange} />
            <p className="text-secondary text-sm">
              Range:{" "}
              <code>
                {dateRange?.from?.toLocaleDateString() ?? "?"} —{" "}
                {dateRange?.to?.toLocaleDateString() ?? "?"}
              </code>
            </p>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-carousel" collapsible title="Carousel">
        <p className="text-secondary text-sm">
          Slide-based carousel built on embla-carousel. Keyboard navigable with arrow keys.
        </p>
        <div className="mx-auto w-full max-w-xs">
          <Carousel>
            <CarouselContent>
              {Array.from({ length: 6 }, (_, i) => (
                <CarouselItem key={i}>
                  <div
                    className={cn(
                      "flex aspect-square items-center justify-center rounded-lg font-semibold text-2xl",
                      surfaceClass(2)
                    )}
                  >
                    {i + 1}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-command" collapsible title="Command">
        <p className="text-secondary text-sm">
          Searchable command palette built on cmdk. Supports grouped items, shortcuts, and empty
          state.
        </p>
        <Command className="rounded-lg border border-surface-3">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <CalendarIcon />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <Smile />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem>
                <Calculator />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Navigation">
              <CommandItem>
                <Home />
                <span>Home</span>
                <CommandShortcut>⌘H</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <User />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <FileText />
                <span>Documents</span>
                <CommandShortcut>⌘D</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Search />
                <span>Search</span>
                <CommandShortcut>⌘K</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PanelCard>

      {}
      <PanelCard id="ds-resizable" collapsible title="Resizable">
        <p className="text-secondary text-sm">
          Resizable panel groups with drag handles. Built on react-resizable-panels.
        </p>
        <div className="space-y-6">
          <div className="space-y-1">
            <Heading>Horizontal with handle</Heading>
            <ResizablePanelGroup
              orientation="horizontal"
              className="min-h-[150px] rounded-lg border border-surface-3"
            >
              <ResizablePanel defaultSize={40}>
                <div className="flex h-full items-center justify-center p-4">
                  <span className="text-secondary text-sm">Panel A</span>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={60}>
                <div className="flex h-full items-center justify-center p-4">
                  <span className="text-secondary text-sm">Panel B</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          <div className="space-y-1">
            <Heading>Vertical with handle</Heading>
            <ResizablePanelGroup
              orientation="vertical"
              className="min-h-[200px] rounded-lg border border-surface-3"
            >
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-4">
                  <span className="text-secondary text-sm">Top</span>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-4">
                  <span className="text-secondary text-sm">Bottom</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          <div className="space-y-1">
            <Heading>Three panels</Heading>
            <ResizablePanelGroup
              orientation="horizontal"
              className="min-h-[150px] rounded-lg border border-surface-3"
            >
              <ResizablePanel defaultSize={25} minSize={15}>
                <div className="flex h-full items-center justify-center p-4">
                  <span className="text-secondary text-sm">Sidebar</span>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-4">
                  <span className="text-secondary text-sm">Content</span>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={25} minSize={15}>
                <div className="flex h-full items-center justify-center p-4">
                  <span className="text-secondary text-sm">Inspector</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </PanelCard>
    </>
  )
}
