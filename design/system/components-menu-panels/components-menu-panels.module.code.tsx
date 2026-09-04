"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@akasha/design-primitives/alert-dialog"
import { Button } from "@akasha/design-primitives/button"
import { cn } from "@akasha/design-primitives/cn"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@akasha/design-primitives/context-menu"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@akasha/design-primitives/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@akasha/design-primitives/dropdown-menu"
import { Heading } from "@akasha/design-primitives/heading"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@akasha/design-primitives/hover-card"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useState } from "react"

export function ComponentsMenuPanels() {
  const [dmCheckbox1, setDmCheckbox1] = useState(true)
  const [dmCheckbox2, setDmCheckbox2] = useState(false)
  const [dmRadio, setDmRadio] = useState("comfortable")

  const [cmCheckbox1, setCmCheckbox1] = useState(true)
  const [cmCheckbox2, setCmCheckbox2] = useState(false)
  const [cmRadio, setCmRadio] = useState("pedro")

  return (
    <>
      {}
      <PanelCard id="ds-dropdown-menu" collapsible title="DropdownMenu">
        <div className="space-y-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>Ctrl+P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>Ctrl+,</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>Billing (disabled)</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuCheckboxItem checked={dmCheckbox1} onCheckedChange={setDmCheckbox1}>
                  Show Toolbar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={dmCheckbox2} onCheckedChange={setDmCheckbox2}>
                  Show Sidebar
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Density</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={dmRadio} onValueChange={setDmRadio}>
                <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="spacious">Spacious</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuItem>Import</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">Delete All</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                Log Out
                <DropdownMenuShortcut>Ctrl+Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className={cn("space-y-1 rounded p-3 text-xs", surfaceClass(2))}>
            <div className="flex gap-2">
              <span className="text-primary">1.</span>
              <span className="text-secondary">
                <strong className="text-primary">Labels + Groups:</strong> Organize items with
                headings and logical groups
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">2.</span>
              <span className="text-secondary">
                <strong className="text-primary">Checkbox items:</strong> Toggle boolean options
                within the menu
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">3.</span>
              <span className="text-secondary">
                <strong className="text-primary">Radio items:</strong> Single-select option groups
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">4.</span>
              <span className="text-secondary">
                <strong className="text-primary">Submenu:</strong> Nested menu for additional
                options
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">5.</span>
              <span className="text-secondary">
                <strong className="text-primary">Destructive variant:</strong> Red text for
                dangerous actions
              </span>
            </div>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-context-menu" collapsible title="ContextMenu">
        <div className="space-y-4">
          <ContextMenu>
            <ContextMenuTrigger
              className={cn(
                "flex h-32 w-full items-center justify-center rounded-md text-secondary text-sm",
                surfaceClass(2)
              )}
            >
              Right-click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem>
                Back
                <ContextMenuShortcut>Alt+Left</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                Forward
                <ContextMenuShortcut>Alt+Right</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                Reload
                <ContextMenuShortcut>Ctrl+R</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem checked={cmCheckbox1} onCheckedChange={setCmCheckbox1}>
                Show Bookmarks Bar
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem checked={cmCheckbox2} onCheckedChange={setCmCheckbox2}>
                Show Full URLs
              </ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuLabel>People</ContextMenuLabel>
              <ContextMenuRadioGroup value={cmRadio} onValueChange={setCmRadio}>
                <ContextMenuRadioItem value="pedro">Pedro</ContextMenuRadioItem>
                <ContextMenuRadioItem value="colm">Colm</ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-hover-card" collapsible title="HoverCard">
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="cursor-pointer font-semibold text-accent underline decoration-accent/30 underline-offset-4">
              @designsystem
            </span>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full font-semibold text-sm",
                    surfaceClass(4)
                  )}
                >
                  DS
                </div>
                <div>
                  <p className="font-semibold text-sm">Design System</p>
                  <p className="text-secondary text-xs">@designsystem</p>
                </div>
              </div>
              <p className="text-secondary text-sm">
                Shared React component library built with Radix and Tailwind. Source-distributed
                with no build step.
              </p>
              <div className="flex gap-4 text-secondary text-xs">
                <span>
                  <strong className="text-primary">48</strong> components
                </span>
                <span>
                  <strong className="text-primary">12</strong> hooks
                </span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </PanelCard>

      {}
      <PanelCard id="ds-alert-dialog" collapsible title="AlertDialog">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="secondary">Default Action</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will apply the changes to your account. This action can be undone from the
                    settings page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Destructive Action</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your data and remove
                    it from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <Heading>Variants</Heading>
          <div className={cn("space-y-1 rounded p-3 text-xs", surfaceClass(2))}>
            <div className="flex gap-2">
              <span className="text-primary">1.</span>
              <span className="text-secondary">
                <strong className="text-primary">Default action:</strong> Primary button for
                confirmations
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">2.</span>
              <span className="text-secondary">
                <strong className="text-primary">Destructive action:</strong> Red button for
                irreversible operations
              </span>
            </div>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-drawer" collapsible title="Drawer">
        <div className="flex flex-wrap gap-2">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="secondary">Open Bottom Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Bottom Drawer</DrawerTitle>
                <DrawerDescription>
                  Vaul-based drawer that slides from the bottom. Supports swipe-to-dismiss gesture.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <p className="text-secondary text-sm">
                  Drawer content area. Uses surface-1 background matching dialogs and sheets.
                </p>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="tertiary">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button variant="secondary">Open Right Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Right Drawer</DrawerTitle>
                <DrawerDescription>
                  Drawer sliding from the right, useful for detail panels and side navigation.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <p className="text-secondary text-sm">
                  Side drawer content. Constrained to 75% width on mobile, max-w-sm on desktop.
                </p>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="tertiary">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </PanelCard>
    </>
  )
}
