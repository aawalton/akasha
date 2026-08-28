"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@shared/design-forms/components/form"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { SidebarNavGroup } from "@shared/design-layout/components/sidebar-nav-group"
import { Button } from "@shared/design-primitives/components/button"
import { Input } from "@shared/design-primitives/components/input"
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@shared/design-primitives/components/menubar"
import { Toaster } from "@shared/design-primitives/components/sonner"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"

export function ComponentsCompoundNavPanels() {
  return (
    <>
      <SidebarNavGroupPanel />
      <MenubarPanel />
      <SonnerPanel />
      <FormPanel />
    </>
  )
}

function SidebarNavGroupPanel() {
  return (
    <PanelCard id="ds-sidebar-nav-group" collapsible title="SidebarNavGroup">
      <p className="text-secondary text-sm">
        Collapsible nav groups with a navigable trigger area and a separate chevron toggle.
      </p>
      <div className={cn("space-y-2 rounded-md p-3", surfaceClass(0))}>
        <SidebarNavGroup
          trigger={<span className="px-2 py-1 font-medium text-sm">Dashboard</span>}
          defaultOpen={true}
        >
          <div className="space-y-0.5 pl-4">
            <div className="rounded-md px-2 py-1 text-secondary text-sm hover:bg-primary/8">
              Overview
            </div>
            <div className="rounded-md px-2 py-1 text-secondary text-sm hover:bg-primary/8">
              Analytics
            </div>
            <div className="rounded-md px-2 py-1 text-secondary text-sm hover:bg-primary/8">
              Reports
            </div>
          </div>
        </SidebarNavGroup>

        <SidebarNavGroup
          trigger={<span className="px-2 py-1 font-medium text-sm">Settings</span>}
          defaultOpen={false}
        >
          <div className="space-y-0.5 pl-4">
            <div className="rounded-md px-2 py-1 text-secondary text-sm hover:bg-primary/8">
              General
            </div>
            <div className="rounded-md px-2 py-1 text-secondary text-sm hover:bg-primary/8">
              Security
            </div>
          </div>
        </SidebarNavGroup>

        <SidebarNavGroup
          trigger={<span className="px-2 py-1 font-medium text-sm">Content</span>}
          defaultOpen={true}
        >
          <div className="space-y-0.5 pl-4">
            <div className="rounded-md px-2 py-1 text-secondary text-sm hover:bg-primary/8">
              Pages
            </div>
            <div className="rounded-md px-2 py-1 text-secondary text-sm hover:bg-primary/8">
              Media
            </div>
            <div className="rounded-md px-2 py-1 text-secondary text-sm hover:bg-primary/8">
              Templates
            </div>
          </div>
        </SidebarNavGroup>
      </div>
    </PanelCard>
  )
}

function MenubarPanel() {
  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showActivityBar, setShowActivityBar] = useState(false)
  const [showPanel, setShowPanel] = useState(false)

  return (
    <PanelCard id="ds-menubar" collapsible title="Menubar">
      <p className="text-secondary text-sm">
        A horizontal menu bar with submenus, checkbox items, radio items, and keyboard shortcuts.
      </p>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>Ctrl+T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window <MenubarShortcut>Ctrl+N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>New Incognito Window</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email Link</MenubarItem>
                <MenubarItem>Messages</MenubarItem>
                <MenubarItem>Notes</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              Print <MenubarShortcut>Ctrl+P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>Ctrl+Y</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Cut <MenubarShortcut>Ctrl+X</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Copy <MenubarShortcut>Ctrl+C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Paste <MenubarShortcut>Ctrl+V</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
              Status Bar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
              Activity Bar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
              Panel
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarRadioGroup value="comfortable">
              <MenubarRadioItem value="compact">Compact</MenubarRadioItem>
              <MenubarRadioItem value="comfortable">Comfortable</MenubarRadioItem>
              <MenubarRadioItem value="spacious">Spacious</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </PanelCard>
  )
}

function SonnerPanel() {
  return (
    <PanelCard id="ds-sonner" collapsible title="Sonner / Toaster">
      <Toaster />
      <p className="text-secondary text-sm">
        Toast notifications via the <code>sonner</code> library. Trigger different toast types
        below.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            toast("Default toast", { description: "This is a standard notification." })
          }
        >
          Default
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            toast.success("Success", { description: "Action completed successfully." })
          }
        >
          Success
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast.error("Error", { description: "Something went wrong." })}
        >
          Error
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast.info("Info", { description: "Here is some useful information." })}
        >
          Info
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast.warning("Warning", { description: "Please proceed with caution." })}
        >
          Warning
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            const id = toast.loading("Loading...", { description: "Please wait." })
            setTimeout(() => toast.success("Done!", { id, description: "Loading complete." }), 2000)
          }}
        >
          Loading
        </Button>
      </div>
    </PanelCard>
  )
}

interface DemoFormValues {
  username: string
  email: string
  bio: string
}

function FormPanel() {
  const form = useForm<DemoFormValues>({
    defaultValues: { username: "", email: "", bio: "" },
  })

  function onSubmit(data: DemoFormValues) {
    toast.success("Form submitted", {
      description: `Username: ${data.username}, Email: ${data.email}`,
    })
  }

  return (
    <PanelCard id="ds-form" collapsible title="Form">
      <p className="text-secondary text-sm">
        Form integration with <code>react-hook-form</code>. Includes validation and error messages
        via FormField, FormItem, FormLabel, FormControl, and FormMessage.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            rules={{
              required: "Username is required",
              minLength: { value: 3, message: "Must be at least 3 characters" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a username" {...field} />
                </FormControl>
                <FormDescription>Your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormDescription>We will never share your email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            rules={{
              maxLength: { value: 160, message: "Bio must be 160 characters or fewer" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input placeholder="Tell us about yourself" {...field} />
                </FormControl>
                <FormDescription>Brief description (max 160 characters).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="primary" size="sm">
            Submit
          </Button>
        </form>
      </Form>
    </PanelCard>
  )
}
