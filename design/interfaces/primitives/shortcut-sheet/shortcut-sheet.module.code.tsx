"use client"

import { useState } from "react"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog/dialog.module.code.tsx"
import { Heading } from "../heading/heading.module.code.tsx"
import { Label } from "../label/label.module.code.tsx"
import {
  groupByLayerAndGroup,
  isChorded,
} from "../shortcut-surfaces/shortcut-surfaces.module.code.ts"
import { Switch } from "../switch-control/switch-control.module.code.tsx"
import {
  useKeyboardBinding,
  useKeyboardBindingDescriptors,
  useShortcutsEnabled,
} from "../use-keyboard-registry/use-keyboard-registry.module.code.ts"

const DISABLE_TOGGLE_ID = "disable-keyboard-shortcuts"

export function ShortcutSheet() {
  const [open, setOpen] = useState(false)
  const descriptors = useKeyboardBindingDescriptors()
  const [enabled, setEnabled] = useShortcutsEnabled()

  useKeyboardBinding({
    id: "house.shortcut-sheet",
    chord: "?",
    label: "Show keyboard shortcuts",
    layer: "conventional",
    onTrigger: (): undefined => {
      setOpen(true)
    },
  })

  const sections = groupByLayerAndGroup(descriptors.filter(isChorded))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
          <DialogDescription>Every active shortcut, grouped by layer.</DialogDescription>
        </DialogHeader>
        <DialogBody className="flex max-h-[60vh] flex-col gap-5 overflow-y-auto">
          {sections.map((section) => (
            <section key={section.label} className="flex flex-col gap-2">
              <Heading variant="label-muted">{section.label}</Heading>
              {section.groups.map((group) => (
                <div key={group.group ?? "__ungrouped__"} className="flex flex-col gap-1">
                  {group.group !== null && <Heading variant="label">{group.group}</Heading>}
                  {group.descriptors.map((descriptor) => (
                    <div
                      key={descriptor.id}
                      className="flex items-center justify-between gap-4 py-1"
                    >
                      <span className="text-secondary text-sm">{descriptor.label}</span>
                      <kbd className="rounded-sm border border-accent px-1.5 py-0.5 font-medium text-tertiary text-xs">
                        {descriptor.display}
                      </kbd>
                    </div>
                  ))}
                </div>
              ))}
            </section>
          ))}
        </DialogBody>
        <div className="flex items-center justify-between gap-4 border-accent border-t pt-4">
          <Label htmlFor={DISABLE_TOGGLE_ID}>Disable keyboard shortcuts</Label>
          <Switch
            id={DISABLE_TOGGLE_ID}
            checked={!enabled}
            onCheckedChange={(checked) => setEnabled(!checked)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
